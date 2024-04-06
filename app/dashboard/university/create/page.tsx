"use client"
import Button from '@/components/button/button'
import Input from '@/components/input/input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const CreateUniversity = () => {
  const router=useRouter();
  const [IsLoading,setIsLoading]=useState(false)
  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues:{
      name: "",
      code:"",
     
    }
  })

  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setIsLoading(true)
    
  
    axios.post('/api/university',data).then(()=>{
    router.push("/dashboard/university/list")
      toast.success("University created successfully")
    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setIsLoading(false)
    });

  }
  return (<div className="min-h-screen w-full flex justify-center items-center p-2">
<div className='space-y-6  bg-white dark:bg-gray-800 w-full md:w-[400px] p-2 rounde-[10px]'>
  <h1 className='text-lg font-semibold'>Create University</h1>
  <div className="grid grid-cols-1 md:grid-col-2 xl:grid-col-3 gap-4">
    <Input id='name' label='University Name' register={register} errors={errors} type={'text'} required placehoder='write name of University'/>
    <Input id='code' label='write University code' register={register} errors={errors} type={'text'} required placehoder='write University code'/>

   
  </div>
  <div className="w-full flex justify-end p-6">
    <Button isDisabled={IsLoading} onClick={handleSubmit(onSubmit)} title={IsLoading? 'Loading...':'Submit'}/>
  </div>
  </div>
</div>
  )
}

export default CreateUniversity