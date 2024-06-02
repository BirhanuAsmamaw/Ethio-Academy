"use client"
import Button from '@/components/button/button'
import Input from '@/components/input/input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Container from '../container/container'


interface ForgotPasswordProps{
  user:any
}
const ForgotPassword:React.FC<ForgotPasswordProps> = ({user}) => {
  const [isLoading,setLoading]=useState(false)
const router=useRouter();
  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues:{
      email:""
    }
  })

const onSubmit:SubmitHandler<FieldValues> = (data)=>{
  setLoading(true)
  axios.post(`/api/user/forgot-password`,data).then(()=>{
    toast.success("Sent to your email address successfully")
    window.open('https://mail.google.com/mail/u/0/#inbox', '_blank');
  }).catch(()=>{
    toast.error("not send to your email address");
  }).finally(()=>{
    setLoading(false);
  });

}

if (user){
  router.back()
  return null;
  }
  return (<div className="h-screen w-full flex justify-center items-center">
<div className="my-8 border-b dark:border-gray-600 text-center">
<Container>
<div className="w-full">
<Input
    id="email"
    label="Enter Your Email" 
    type="email" 
    register={register}
    errors={errors} 
    required
    placehoder='write your email'
       
  />
</div>
    
    <div className="w-full flex justify-end p-4">
      <Button isDisabled={isLoading} title={isLoading? "Loading...":"Submit"} onClick={handleSubmit(onSubmit)}/>
    </div>
  </Container>
  </div>
  </div>

  )
}

export default ForgotPassword;