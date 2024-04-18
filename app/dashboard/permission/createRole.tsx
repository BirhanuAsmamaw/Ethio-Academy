
"use client"
import Input from '@/components/input/input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { IoIosSend } from 'react-icons/io'

const CreateRole = () => {
  const router=useRouter()
  const [isLoading,setIsLoading] =useState(false)
  const {register,handleSubmit,reset,formState:{errors}}=useForm<FieldValues>({
    defaultValues:{
      name:""
    }
  })


  const onSubmit:SubmitHandler<FieldValues>=(data)=>{
    setIsLoading(true);
    axios.post('/api/authorization/role',data).then(()=>{
      toast.success("Role  created  successfully")
      router.push("/dashboard/permission")
      router.refresh()
      reset();
    }).catch((errors)=>{
      toast.error("something went wrong");
    }).finally(()=>{
      setIsLoading(false);
    });
   
  
  }
  return (<div className="grid grid-cols-2 w-full justify-center gap-1">
      
 
  <Input
  
  id="name"
  label="Add Role"
  required
  register={register}
  errors={errors}
  disabled={isLoading}
  type="text"
  />
 
  <button onClick={handleSubmit(onSubmit)} className="text-gray-500 dark:text-gray-400 font-bold hover:text-blue-500 hover:dark:text-blue-400 transition  duration-300"><IoIosSend size={40}/></button>

  </div>
  )
}

export default CreateRole