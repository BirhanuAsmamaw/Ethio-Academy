"use client"

import Heading from '@/components/Heading/Heading'
import Button from '@/components/button/button'
import Input from '@/components/input/input'
import axios from 'axios'

import React, { useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

const ExamsTypes = () => {
 
const [isLoading, setIsLoading]=useState(false)
  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues: {
      examType:""
        
    },
  })




  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setIsLoading(true)
   

  const exam={...data}
    axios.post('/api/examCategory',exam).then(()=>{
      toast.success("exams Category created successfully")
    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setIsLoading(false)
    });

  }








  
  return ( <div className="w-full">
    <div className="p-4"> <Heading small title=" Exams Category "/></div>
  <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 justify-between">
    {/* create exams category */}
    
    <div className="pt-10 flex-col items-center justify-center w-full ">

    <Input id="examType" register={register} errors={errors}  label="Exams Type" type="text" required/>
    </div>
  </div>
  <div className="w-full flex justify-end  mt-6 py-6 px-4 ">
    <Button isDisabled={isLoading} title={isLoading?'Loading...':'Submit'} onClick={handleSubmit(onSubmit)}/>
  </div>
  </div>
  )
}

export default ExamsTypes