"use client"

import Heading from '@/components/Heading/Heading'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useEffect, useState } from 'react'
 
interface  CreateExamsClientProps{
 
  exams:any[];
}
const CreateExamsClient:React.FC<CreateExamsClientProps> = ({exams}) => {
  const [examIdvalue,setExamIdValue]=useState("")
  const [departmentIdvalue,setDepartmentIdValue]=useState("")
  const [departments,setDepartments]=useState<any|null>(null)
  const [subjects,setSubjects]=useState<any|null>(null)

  useEffect(()=>{
    const Ex=exams.filter((exam)=>exam.id==examIdvalue)
    setDepartments(Ex[0])
  },[exams,examIdvalue])



  useEffect(()=>{
    const dep=departments.departments.filter((department:any)=>department.id==departmentIdvalue)
    setSubjects(dep[0])
  },[departments,departmentIdvalue])



  return (<div className="py-10 flex flex-col bg-white px-4 dark:bg-gray-800 flex-col gap-10 min-h-screen w-full">
     <div className="w-full">
    <div className="p-4">
      <Heading title={'Exams Subject'}/>
    </div>

  <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 justify-between">
    {/* create exams category */}
    <div className="w-full   flex flex-col gap-1">
    <Select
           onValueChange={
            (value)=>setExamIdValue(value)
          }>
      <SelectTrigger  className="w-[180px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
        <SelectValue  placeholder="Select Exam Typet" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
        <SelectGroup>
          <SelectLabel>Select Exam Type</SelectLabel>
         {exams?.map((exam,index) =>{
         return  <SelectItem className="w-full hover:bg-gray-200  hover:dark:bg-gray-600" key={index} value={exam.id}>{exam.examType}</SelectItem >
         })}
          
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>


  
    </div>


    {departments?<div className="w-full   flex flex-col gap-1">
    <Select
           onValueChange={
            (value)=>setDepartmentIdValue(value)
          }>
      <SelectTrigger  className="w-[180px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
        <SelectValue  placeholder="Select Department" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
        <SelectGroup>
          <SelectLabel>Select Department</SelectLabel>
         {departments?.departments?.map((department:any,index:number) =>{
         return  <SelectItem className="w-full hover:bg-gray-200  hover:dark:bg-gray-600" key={index} value={department.id}>{department.departmentName}</SelectItem >
         })}
          
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>:""}


    {subjects?<div className="w-full   flex flex-col gap-1">
    <Select
           onValueChange={
            (value)=>setExamIdValue(value)
          }>
      <SelectTrigger  className="w-[180px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
        <SelectValue  placeholder="Select Subject" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
        <SelectGroup>
          <SelectLabel>Select Subject</SelectLabel>
         {subjects?.subject?.map((subject:any,index:number) =>{
         return  <SelectItem className="w-full hover:bg-gray-200  hover:dark:bg-gray-600" key={index} value={subject.id}>{subject.subjectName}</SelectItem >
         })}
          
        </SelectGroup>
      </SelectContent>
    </Select>

    </div>:""}
  </div>
  </div>
  )
}

export default CreateExamsClient