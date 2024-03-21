"use client"
import Button from '@/components/button/button'
import Input from '@/components/input/input'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const ResetPasswordClient = () => {
 const searchparam=useSearchParams();
  const token=searchparam?.get("token")

  const [isLoading,setLoading]=useState(false)

  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues:{
      token:token,
      retypePassword:"",
      password:""
    }
  })

const onSubmit:SubmitHandler<FieldValues> = (data)=>{
  setLoading(true)
  axios.post(`/api/user/reset-password`,{...data,token:token}).then(()=>{
    toast.success("password reset successfully")
  }).catch(()=>{
    toast.error("password reset failed");
  }).finally(()=>{
    setLoading(false);
  });

}

  return (<div className="h-screen w-full flex justify-center items-center">
  
  <div className="m-2 border border-gray-200 dark:border-gray-600  rounded-[10px] bg-white dark:bg-gray-800 px-2 py-6 w-full md:max-w-md flex flex-col items-center gap-4">
   <h1 className='text-lg font-bold p-4'>Reset Your Password</h1>
  <div className="w-full">
  <Input
      id="password"
      label="Password" 
      type="password" 
      register={register}
      errors={errors} 
      required
         
    />
  </div>
  <div className="w-full">
  <Input
      id="retypePassword"
      label="Confirm Password" 
      type="password" 
      register={register}
      errors={errors} 
      required
         
    />
  </div>

      
      <div className="w-full flex justify-end p-4">
        <Button isDisabled={isLoading} title={isLoading? "Loading...":"Submit"} onClick={handleSubmit(onSubmit)}/>
      </div>
    </div>
  
    </div>
  
    )
}

export default ResetPasswordClient