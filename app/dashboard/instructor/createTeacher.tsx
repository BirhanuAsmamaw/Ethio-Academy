"use client"

import { FieldValues,SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios"
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import Input from "@/components/input/input";
import Button from "@/components/button/button";
import Link from "next/link";


interface CreateTeacherProps{
  user:any;
}
const CreateTeacher:React.FC<CreateTeacherProps> = ({user}) => {
const router=useRouter();
  const [Loading,setLoading]=useState(false);
  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues:{
     title:"",
     accountName:user?.name,
     bankAccount:"",
     description:""
    }

  })
  const onSubmit:SubmitHandler<FieldValues>=(data) => {

   
    setLoading(true)
    axios.post("/api/teacher",data).then((response) => {
      
      toast.success("Successfully created");
  
    
       
    }).catch((error:any) => {
      toast.error(error.message)
    }).finally(()=>{
      setLoading(false)
      
    });
    
    
  }



 


if (!user){
router.back()
return null;
}

  return (
<div className="m-2 border rounded-md border-gray-200 dark:border-gray-600  w-full p-2 flex justify-center bg-white shadow-md  dark:bg-black px-2 pt-4 pb-10  md:max-w-2xl flex-col gap-2">

<div className="flex flex-col gap-6">
<div className="pt-4">
    <h1 className="font-semibold text-2xl md:text-3xl">Create Your Own Teaching Account</h1>
  </div>
  <div className="space-y-2 p-4">
    <p className=" font-medium text-lg md:text-xl border-b-2 py-2 border-gray-600 dark:border-gray-300 border-dotted"><span className="text-blue-600 dark:text-green-400">{user.name}</span> ,Are you passionate about teaching and eager to share your knowledge with a global audience?</p>
    <div className="text-[16px] text-left "> <span>Join our community of expert instructors and transform lives by delivering engaging and impactful tutorials. At</span> <Link href="/" className='text-lg no-underline hover:underline  p-0'>
          <span className='text-blue-500 dark:text-green-400 '>Ethio</span>
         <span className='text-rose-500 dark:text-yellow-400 '>Academy</span></Link><span>,  we provide you with the tools and support you need to create high-quality courses that inspire and educate learners everywhere.</span></div>
  </div>
<Input
    id="title"
    label="What is Your Teaching Title? (optional)" 
    type="text" 
    register={register}
    errors={errors}  
    placehoder="eg. Software Developement,Nursing,..." 
   
     
  />  
  <Input
    id="accountName"
    label="Channel Name (optional)" 
    type="text" 
    defaultValue={user?.name}
  
    register={register}
    errors={errors} 
   
       
  />

<Input
    id="description"
    label="write some description about your Channel (optional)" 
    type="text" 
    register={register}
   
    errors={errors} 
   
  />


<Input
    id="bankAccount"
    label="Enter Your CBE Bank Account (optional)"
    placehoder="10000..." 
    type="text" 
    register={register}
    errors={errors} 
   
   
  />
</div>
<div className="mt-4 flex justify-end w-full">
<Button 
  isDisabled={Loading}
  title={Loading? "Loading...":"Create"}
  className="transition duration-300  text-center " 
  onClick={handleSubmit(onSubmit)}/>
</div>


</div> 

  );
}
 
export default CreateTeacher;

