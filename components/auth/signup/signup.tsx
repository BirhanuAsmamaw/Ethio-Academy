"use client"

import { FieldValues,SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios"
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import {signIn} from 'next-auth/react'
import Link from "next/link";
import Input from "@/components/input/input";
import Button from "@/components/button/button";
import Container from "@/components/container/container";

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
         router.push("/dashboard/profile");
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
router.push("/dashboard/profile")
return null;
}

  return (
<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <Container>
     
    <form onSubmit={handleSubmit(onSubmit)}>
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
<div className="mt-6 py-2 flex justify-end w-full">
  <Button 
  type="submit"
  isDisabled={Loading}
  title={Loading? "Loading...":"Create Account"}
  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out" 
  />
</div>

</form>
<p className="text-sm text-gray-500 dark:text-gray-400">Already have an account?<Link className="text-lg no-underline hover:underline p-1" href="/login"> Login</Link> to stay connected with our community!</p>

<div className="my-8 border-b dark:border-gray-600 text-center">
                        <div
                            className="leading-none px-2 inline-block text-sm dark:text-gray-400 text-gray-600 tracking-wide font-medium bg-white dark:bg-gray-800 transform translate-y-1/2">
                            Or sign In with Google
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <button
                        onClick={signInWithGoogle}
                            className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 dark:bg-green-800/25 hover:dark:bg-green-800/30 bg-green-100 text-gray-800 dark:text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow hover:dark:shadow-black focus:shadow-sm focus:shadow-outline">
                            <div className="bg-white dark:bg-gray-800 p-2 rounded-full">
                                <svg className="w-4" viewBox="0 0 533.5 544.3">
                                    <path
                                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                        fill="#4285f4" />
                                    <path
                                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                        fill="#34a853" />
                                    <path
                                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                        fill="#fbbc04" />
                                    <path
                                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                        fill="#ea4335" />
                                </svg>
                            </div>
                            <span className="ml-4">
                                Sign In with Google
                            </span>
                        </button>

                    </div>
</Container>
</div> 

  );
}
 
export default Signup;

