
"use client"
import Heading from '@/components/Heading/Heading'
import Button from '@/components/button/button'
import Input from '@/components/input/input'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'


interface AddSubjectClinetProps{
  department: any
}
const AddSubjectClinet:React.FC<AddSubjectClinetProps> = ({department}) => {
  const router=useRouter();
 
  const [isLoading, setIsLoading]=useState(false)

  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues: {
      departmentId:department.id,
      subject:""
        
    },
  })
  


  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setIsLoading(true)

    
    axios.post('/api/subject',{...data,departmentId:department.id}).then(()=>{
      router.push("/dashboard/exams")
      router.refresh()
      toast.success("Subject created successfully")
    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setIsLoading(false)
    });

  }
  return ( <div className="w-full md:w-[400px] bg-white dark:bg-gray-800 p-4">
    <div className="p-4">
      <Heading title={`Add ${department.departmentName}s Subject`}/>
    </div>
  <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 justify-between">
  
   

    <div className="pt-10 flex-col items-center justify-center w-full ">

    <Input id="subject" register={register} errors={errors}  label="Add Subject" type="text" required/>
    </div>
  </div>
  <div className="w-full flex justify-end  mt-6 py-6 px-4 ">
    <Button isDisabled={isLoading} title={isLoading?'Loading...':'Submit'} onClick={handleSubmit(onSubmit)}/>
  </div>
  </div>
  )
}

export default AddSubjectClinet