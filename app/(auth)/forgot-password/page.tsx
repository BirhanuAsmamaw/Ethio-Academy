"use client"
import Button from '@/components/button/button'
import Input from '@/components/input/input'
import axios from 'axios'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
  const [isLoading,setLoading]=useState(false)

  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues:{
      email:""
    }
  })

const onSubmit:SubmitHandler<FieldValues> = (data)=>{
  setLoading(true)
  axios.post(`/api/user/forgot-password`,data).then(()=>{
    toast.success("Sent to your email address successfully")
  }).catch(()=>{
    toast.error("not send to your email address");
  }).finally(()=>{
    setLoading(false);
  });

}
  return (<div className="h-screen w-full flex justify-center items-center">

<div className="m-2 border border-gray-200 dark:border-gray-600  rounded-[10px] bg-white dark:bg-gray-800 px-2 py-6 w-full md:max-w-md flex flex-col items-center gap-4">
<div className="w-full">
<Input
    id="email"
    label="Enter Your Email" 
    type="email" 
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

export default ForgotPassword