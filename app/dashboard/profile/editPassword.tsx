
"use client"
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import {signIn} from 'next-auth/react'
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import CModal from "@/components/customModal";
import { TbArrowsExchange } from "react-icons/tb";
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
            router.push("/dashboard/profile")
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

    

  return (<CModal
          disabled={isLoading}
          buttonLabel={isLoading ? 'Changing...' : 'Change'}
          onClick={handleSubmit(onSubmit)}
          className='bg-transparent p-0 hover:bg-transparent hover:text-black hover:dark:text-white text-gray-600 dark:text-gray-200'
          modalName={ <h6 className="flex gap-2 text-sm"><TbArrowsExchange size={24}/><span>Password</span></h6>}
        >
          
          <div className=" flex flex-col gap-4 w-full md:w-[400px]">
  <h1 className="text-lg font-semibold">Edit Your Password</h1>
  <div className="p-2 space-y-3">
    <Input type="password" label="Old Password" register={register} errors={errors} id="oldPassword"/>
    <Input type="password" label="New password" register={register} errors={errors} id="newPassword"/>
   
  </div>
</div>
        </CModal> );
}
 
export default EditPassword;