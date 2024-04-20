
"use client"
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import {signIn} from 'next-auth/react'
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
interface EditPasswordProps{
  user:any;
}
const EditPassword:React.FC<EditPasswordProps>= ({user}) => {
  const router=useRouter();

  const [isLoading,setloading] =useState(false);

  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
  
    defaultValues:{
      
      oldPassword:"",
      newPassword:""

        
    }})

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
      setloading(true);
      axios.put('/api/user/updatepassword', data).then(() => {
        toast.success("Your profile has been updated successfully")
      
        signIn('credentials',{
          email: user.email,
          password: data.newPassword,
          redirect:false,
         }).then((callback)=>{
           if (callback?.ok){
            router.push("/mycourses")
            router.refresh();
             
             toast.success("account logged in successfully")
             
           }
           if (callback?.error){
             toast.error(callback.error)
           }
         })  
      }).catch((error)=>{
        toast.error(error.message)
      }).finally(() => {
        setloading(false);
      });
     
      
    }

    

  return ( <div className="p-2 flex flex-col gap-4 w-full md:w-[400px] bg-white dark:bg-black">
  <h1 className="text-lg font-semibold">Edit Your Password</h1>
  <div className="p-2 space-y-3">
    <Input type="password" label="Old Password" register={register} errors={errors} id="oldPassword"/>
    <Input type="password" label="New password" register={register} errors={errors} id="newPassword"/>
    <div className="p-6 flex justify-end">
      <Button isDisabled={isLoading} title={isLoading? "Loading...":"Submit"} onClick={handleSubmit(onSubmit)}/>
    </div>
  </div>
</div> );
}
 
export default EditPassword;