"use client"

import { FieldValues,SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/input/input";
import Button from "@/components/button/button";
import Link from "next/link";
import { useCreateInstructorMutation } from "@/redux/features/instructors/instructorApi";

import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import Login from "@/components/auth/login/login";
interface CreateTeacherProps{
  user:any;
}
const CreateTeacher:React.FC<CreateTeacherProps> = ({user}) => {
const router=useRouter();
 
  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues:{
     title:"",
     accountName:user?.name,
     bankAccount:"",
     description:""
    }

  })

  const [createInstructor,{data,isSuccess,isLoading,isError}]=useCreateInstructorMutation()
  const onSubmit:SubmitHandler<FieldValues>=async(data) => {

   
 await createInstructor(data)
    
    
  }


  if (!user){
 
    return <Login user={user}/>;
    }
  


  if(isSuccess){
    return <div className="h-screen w-full flex justify-center p-2 items-center ">
    <div className="w-full md:max-w-md p-6 bg-white dark:bg-black rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-left text-green-600 dark:text-green-400 mb-4">Account Created Successfully!</h1>
      <p className="text-left text-gray-700 dark:text-gray-300">
        Thank you for creating your teaching account. Your account is now under review, and you'll be notified once it is approved by our admin team.
      </p>
      <div className="mt-6 text-center">
       <div className="w-full flex justify-center">
       <IoCheckmarkDoneCircleSharp className="text-green-600 dark:text-green-400" size={100}/>
       </div>
        <p className="text-gray-500 text-left tracking-tight text-sm dark:text-gray-400">We appreciate your patience and look forward to having you on board!</p>
      </div>
    </div>
  </div>
  
  }
 



if(user&&user.teacher&&!user.teacher.status){
  router.push("/dashboard/profile")
return null;
}

if(user&&user.teacher&&user.teacher.status){
  router.push("/dashboard/instructor/account")
return null;
}
if(isError){
  toast.error("The Account is Already Created!!")
}

  return (<div className="m-2 border rounded-md border-gray-200 dark:border-gray-600 w-full p-2 flex justify-center bg-white shadow-md dark:bg-black px-2 pt-4 pb-10 md:max-w-2xl flex-col gap-2">
  <div className="flex flex-col gap-6">
    <div className="pt-4">
      <h1 className="font-semibold text-2xl md:text-3xl text-center text-blue-600 dark:text-green-400">Welcome to EthioAcademy!</h1>
    </div>
    <div className="space-y-2 p-4 text-center">
      <p className="font-medium text-lg md:text-xl border-b-2 py-2 border-gray-600 dark:border-gray-300 border-dotted">
        <span className="text-blue-600 dark:text-green-400">{user.name}</span>, your journey to inspire and educate begins here!
      </p>
      <div className="text-[14px]  mt-4  py-4 text-left">
        <span>Join our vibrant community of passionate instructors and make a real difference by sharing your expertise. At </span>
        <Link href="/" className="text-lg no-underline hover:underline p-0">
          <span className="text-blue-500 dark:text-green-400">Ethio</span>
          <span className="text-rose-500 dark:text-yellow-400">Academy</span>
        </Link>
        <span>, we empower you with the tools and support to create transformative and impactful courses for learners across the globe.</span>
      </div>
    </div>
    <div className="space-y-4 w-full text-black dark:text-white">
      <Input
        id="title"
        label="Your Teaching Title (optional)"
        type="text"
        register={register}
        errors={errors}
        placehoder="e.g. Software Development, Nursing, Medicine, Business, Law..."
       
      />
      <Input
        id="accountName"
        label="Account Name (optional)"
        type="text"
        defaultValue={user?.name}
        register={register}
        errors={errors}
      />
      <Input
        id="description"
        label="Describe Your Channel (optional)"
        type="text"
        register={register}
        errors={errors}
      />
      <Input
        id="bankAccount"
        label="CBE Bank Account (optional)"
        placehoder="10000..."
        type="text"
        register={register}
        errors={errors}
      />
    </div>
  </div>
  <div className="mt-4 flex justify-end w-full">
    <Button 
      isDisabled={isLoading}
      title={isLoading ? "Creating..." : "Create Account"}
      className="transition duration-300 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      onClick={handleSubmit(onSubmit)}
    />
  </div>
</div>


  );
}
 
export default CreateTeacher;

