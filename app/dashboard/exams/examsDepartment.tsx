"use client"

import Heading from '@/components/Heading/Heading'
import Button from '@/components/button/button'
import Input from '@/components/input/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useExamId } from '@/hooks/useExamsId'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
 interface ExamsDepartmentProps{
  examTypes:any[]|null
 }
const ExamsDepartment:React.FC<ExamsDepartmentProps> = ({examTypes}) => {
  const router=useRouter()
  const [isLoading, setIsLoading]=useState(false)
  const [examIdValue,setExamIdValue]=useState("")
  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues: {
      examId:examIdValue,
      department:""
        
    },
  })
  
const {onSetExamId}=useExamId()
useEffect(()=>{
  onSetExamId(examIdValue)
  router.refresh()
},[examIdValue,router])






  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setIsLoading(true)
    
    axios.post('/api/department',data).then(()=>{
      toast.success("Department created successfully")
      router.refresh()
    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setIsLoading(false)
    });

  }
  return ( <div className="w-full">
    <div className="p-4">
    <Heading small title="Upload Exams Category Cover"/>
    </div>
  <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 justify-between">
    {/* create exams category */}
    <div className="w-full   flex flex-col gap-1">
    <Select
           onValueChange={
            (value)=>setExamIdValue(value)
          }>
      <SelectTrigger  className="w-[180px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
        <SelectValue  placeholder="Select a Quizzes Year" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
        <SelectGroup>
          <SelectLabel>Select Exam Type</SelectLabel>
         {examTypes?.map((exam,index) =>{
         return  <SelectItem className="w-full hover:bg-gray-200  hover:dark:bg-gray-600" key={index} value={exam.id}>{exam.examType}</SelectItem >
         })}
          
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>

    <div className="pt-10 flex-col items-center justify-center w-full ">

    <Input id="department" register={register} errors={errors}  label="write Department" type="text" required/>
    </div>
  </div>
  <div className="w-full flex justify-end  mt-6 py-6 px-4 ">
    <Button isDisabled={isLoading} title={isLoading?'Loading...':'Submit'} onClick={handleSubmit(onSubmit)}/>
  </div>
  </div>
  )
}

export default ExamsDepartment