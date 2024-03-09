
"use client"
import Heading from '@/components/Heading/Heading'
import Button from '@/components/button/button'
import Input from '@/components/input/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useExamId } from '@/hooks/useExamsId'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const ExamSubject = () => {
  const [departmentIdValue,setDepartmentIdValue]=useState("")
  const [isLoading, setIsLoading]=useState(false)
  const [departments,setDepartments]=useState<any[]|null>(null)
  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues: {
      departmentId:departmentIdValue,
      subject:""
        
    },
  })
  


const {examId}=useExamId()


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/examCategory/${examId}/category`);
      setDepartments(response.data)
    } catch (error) {
      console.error('Error fetching department category:', error);
    }
  };

  fetchData();
}, [examId]);





  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setIsLoading(true)
    
    axios.post('/api/subject',data).then(()=>{
      toast.success("Subject created successfully")
    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setIsLoading(false)
    });

  }
  return ( <div className="w-full">
    <div className="p-4">
      <Heading title={'Exams Subject'}/>
    </div>
  <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 justify-between">
    {/* create exams category */}
    <div className="w-full   flex flex-col gap-1">
    <Select
           onValueChange={
            (value)=>setDepartmentIdValue(value)
          }>
      <SelectTrigger  className="w-[180px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
        <SelectValue  placeholder="Select a Quizzes Year" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
        <SelectGroup>
          <SelectLabel>Select Department</SelectLabel>
         {departments?.map((department,index) =>{
         return  <SelectItem className="w-full hover:bg-gray-200  hover:dark:bg-gray-600" key={index} value={department.id}>{department.departmentName}</SelectItem >
         })}
          
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>

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

export default ExamSubject