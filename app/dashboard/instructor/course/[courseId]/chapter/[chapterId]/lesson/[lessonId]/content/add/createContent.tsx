"use client"
import Button from '@/components/button/button'
import TextEditor from '@/components/editor/editor'
import Heading from '@/components/Heading/Heading'
import axios from 'axios'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { IoMdAdd } from 'react-icons/io'
import { RiSubtractFill } from "react-icons/ri";
import CreateContentImage from './createContentImage'
interface  CreateContentProps{
  lesson:any,
  contentId?:string;
}
const CreateContent:React.FC<CreateContentProps> = ({lesson,contentId}) => {
  const [description, setDescription]=useState("")
  const [showCode,setShowCode]=useState(false)
  const [showContent,setShowContent]=useState(false)
  const [code,setCode]=useState("")
  const [language,setLanguage]=useState("")

  const [isLoading,setLoading]=useState(false);

  const router=useRouter();

  const {handleSubmit,setValue}=useForm<FieldValues>({
    defaultValues:{
      code:"",
      language:"",
      parentId:contentId||null,
      lessonId:lesson.id,
    }
  })
  
  useEffect(() =>{
    setValue('content',description)
  },[description]);




  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setLoading(true)
    

  const contentData={...data,code:code,language:language}
  
 
    axios.post('/api/content',contentData).then(()=>{
      toast.success("Lesson Content successfully")
      
      redirect(`/dashboard/instructor/course/${lesson?.chapter?.courseId}/chapter/${lesson?.chapterId}/lesson/${lesson?.id}/update-content`)
      
    })
    .catch((error)=>{
   
      toast.error(error.message)
    
    }).finally(()=>{
      setLoading(false)
    });

  }


  return (<div className="flex flex-col  w-full  gap-1  pt-2 my-4">
  {showContent?<><Heading small title="Add Lesson Content"/>
<TextEditor value={description} setValue={setDescription}/></>:""}

{showCode?<div className=" space-y-6 text-left w-full flex flex-col">

  <input type="text" onChange={(event)=>setLanguage(event?.target.value)} className='border outline-none border-slate-400 hover:border-blue-500 focus:border-blue-500 focus:dark:border-green-400  hover:dark:border-green-400 dark:border-gray-500    w-full md:w-1/2 lg:w-1/3 xl:w-2/5 bg-slate-50 rounded-md dark:bg-gray-800' placeholder='add programming language'/>

  <textarea
  onChange={(event)=>setCode(event?.target.value)} 
  rows={6}
   className='w-full xl:w-1/2  outline-none bg-slate-50 rounded-md dark:bg-gray-800 border border-slate-400 dark:border-gray-500  hover:border-blue-500 focus:border-blue-500 focus:dark:border-green-400  hover:dark:border-green-400' placeholder='write code examples...'/>

</div>:""}

<div className="w-full mt-4 flex justify-start px-4">
  <CreateContentImage lesson={lesson}/>
  <button
     onClick={()=>{
      setCode("")
      setLanguage("")
      setShowCode((prev)=>!prev)
     }}
    className="py-1 md:py-2 px-3 md:px-5 me-2 mb-2
text-sm font-medium text-gray-900 focus:outline-none
 bg-white rounded-full border border-gray-200 
 hover:bg-gray-100 hover:text-blue-700 focus:z-10 
 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700
  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
   dark:hover:text-white dark:hover:bg-gray-700 flex gap-2 items-center justify-center">
    {showCode? <RiSubtractFill size={24}/>:<IoMdAdd size={24}/>} <p>Code</p></button> 

    <button
     onClick={()=>{
      setDescription("")
      setShowContent((prev)=>!prev)
     }}
    className="py-1 md:py-2 px-3 md:px-5 me-2 mb-2
text-sm font-medium text-gray-900 focus:outline-none
 bg-white rounded-full border border-gray-200 
 hover:bg-gray-100 hover:text-blue-700 focus:z-10 
 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700
  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
   dark:hover:text-white dark:hover:bg-gray-700 flex gap-2 items-center justify-center">
    {showContent? <RiSubtractFill size={24}/>:<IoMdAdd size={24}/>} <p>Content</p></button>
</div>
<div className="flex w-full justify-end p-4">
  <Button onClick={handleSubmit(onSubmit)} title={isLoading? "Loading...":"Submit"} isDisabled={isLoading}/>
</div>


</div>
  )
}

export default CreateContent