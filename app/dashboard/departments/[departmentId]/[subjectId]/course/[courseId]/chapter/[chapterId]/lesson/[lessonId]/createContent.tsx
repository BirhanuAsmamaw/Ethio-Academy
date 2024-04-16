"use client"
import Button from '@/components/button/button'
import TextEditor from '@/components/editor/editor'
import Heading from '@/components/Heading/Heading'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface  CreateContentProps{
  lesson:any
}
const CreateContent:React.FC<CreateContentProps> = ({lesson}) => {
  const [description, setDescription]=useState("")
  const [isLoading,setLoading]=useState(false);

  const router=useRouter();
  const {handleSubmit,setValue}=useForm<FieldValues>({
    defaultValues:{
    
      lessonId:lesson.id,
    }
  })
  
  useEffect(() =>{
    setValue('content',description)
  },[description]);




  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setLoading(true)
    

  const contentData={...data}
 
    axios.post('/api/content',contentData).then(()=>{
      toast.success("Lesson Content successfully")
      router.push(`/dashboard/list-courses`)
      router.refresh();
    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setLoading(false)
    });

  }


  return (<div className="flex flex-col px-4 w-full  gap-1  pt-2 my-4">
  <Heading small title="Add Lesson Content"/>
<TextEditor value={description} setValue={setDescription}/>
<div className="flex w-full justify-end p-4">
  <Button onClick={handleSubmit(onSubmit)} title={isLoading? "Loading...":"Submit"} isDisabled={isLoading}/>
</div>
</div>
  )
}

export default CreateContent