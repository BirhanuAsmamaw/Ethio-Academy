"use client"
import Button from '@/components/button/button'
import Input from '@/components/input/input'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Container from '../container/container'

interface ResetPasswordClientProps{
  user:any;
}
const ResetPasswordClient:React.FC<ResetPasswordClientProps> = ({user}) => {
  const router=useRouter();
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
    router.push("/login")
    router.refresh()
  }).catch(()=>{
    toast.error("password reset failed");
  }).finally(()=>{
    setLoading(false);
  });

}

if (user){
  router.back()
  return null;
  }
  return (<div className="h-screen w-full flex justify-center items-center">
  
  <Container>
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
    </Container>
  
    </div>
  
    )
}

export default ResetPasswordClient