"use client"

import { FieldValues,SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios"
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import {signIn} from 'next-auth/react'
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import Input from "@/components/input/input";
import Button from "@/components/button/button";

interface SignupProps{
  user:any;
}
const Signup:React.FC<SignupProps> = ({user}) => {
const router=useRouter();
  const [Loading,setLoading]=useState(false);
  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues:{
     name:"",
      email:"",
      password:"",
      repeatpassword:""
    }

  })
  const onSubmit:SubmitHandler<FieldValues>=(data) => {

   
    setLoading(true)
    axios.post("/api/user/register",data).then((response) => {
      
      toast.success("Send to Email  Successfully  and Check your email address!");
      window.open('https://mail.google.com/mail/u/0/#inbox', '_blank');
    
       
    }).catch((error:any) => {
      toast.error(error.message)
    }).finally(()=>{
      setLoading(false)
      
    });
    
    
  }



  const signInWithGoogle=()=>{
    signIn('google',{redirect:false}).then((callback)=>{
       if (callback?.ok){
         router.back();
         router.refresh()
         
         toast.success("account logged in successfully")
         
       }
       if (callback?.error){
         toast.error(callback.error)
       }
     }).catch((error:any)=>toast.error(error.message)).finally(() => {
             setLoading(false)
     })  
  }


if (user){
router.back()
return null;
}

  return (
<div className="my-10 shadow-md bg-white dark:bg-black px-2 pt-4 pb-10 w-full md:max-w-md flex flex-col gap-2">

<div className="flex flex-col gap-4">
<div className="py-4 w-full flex justify-center">
    <h1 className="font-semibold text-[20px] leading-6 text-blue-500 dark:text-green-400">Register Your Account</h1>
  </div>
<Input
    id="name"
    label="Your Full Name" 
    type="text" 
    register={register}
    errors={errors}   
    required
     
  />  
  <Input
    id="email"
    label="Email" 
    type="email" 
    register={register}
    errors={errors} 
    required
       
  />

<Input
    id="password"
    label="Password" 
    type="password" 
    register={register}
    required
    errors={errors} 
   
  />


<Input
    id="repeatpassword"
    label="Confirm Password" 
    type="password" 
    register={register}
    errors={errors} 
    required
   
  />
</div>
<div className="mt-4 flex justify-end w-full">
<Button 
  isDisabled={Loading}
  title={Loading? "Loading...":"Signup"}
  className="transition duration-300  text-center " 
  onClick={handleSubmit(onSubmit)}/>
</div>
<p className="text-sm text-gray-500 dark:text-gray-400">Already have an account?<Link className="text-lg no-underline hover:underline p-1" href="/login"> Login</Link> to stay connected with our community!</p>

<div className="flex mt-10 w-full relative px-2 py-4 line-clamp-5">
  <hr  className=" absolute left-0 w-5/12 border-[1.5px] border-gray-200 dark:border-gray-500"/>
  <p className=" absolute left-[43%] -top-[1px] text-xl text-gray-500 dark:text-gray-400 font-mono font-light tracking-wide ">OR</p>
  <hr className="absolute right-0  w-6/12 border-[1.5px] border-gray-200 dark:border-gray-500"/>
</div>
<div className="w-full flex justify-center">
<button className="flex gap-2
 hover:bg-opacity-70 
 hover:dark:bg-opacity-70
 bg-black 
 text-white
dark:bg-white

 dark:text-black 
 flex
 justify-center
  w-8/12 
  mx-2 
  text-center
  px-2 
  py-1 
  border
   rounded-full border-gray-400 dark:border-gray-700 transition" onClick={signInWithGoogle}><FcGoogle size={24}/> <p className="text-base">Signing With Google</p></button>
</div>
</div> 

  );
}
 
export default Signup;

