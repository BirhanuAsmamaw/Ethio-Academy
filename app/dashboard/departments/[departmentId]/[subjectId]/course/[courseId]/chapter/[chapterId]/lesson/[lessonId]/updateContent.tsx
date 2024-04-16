"use client"


import CModal from "@/components/customModal"
import TextEditor from "@/components/editor/editor"
import axios from "axios"
import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"

interface UpdateContentProps{
  content:any
}
 const UpdateContent:React.FC<UpdateContentProps>=({content})=> {
  const [description, setDescription]=useState<string|null>(null)
const [isLoading,setIsLoading]=useState(false)

const router=useRouter();
  const {handleSubmit,setValue}=useForm<FieldValues>({
    defaultValues: {
     content:description||content?.content
      
      }})

useEffect(()=>{
  setValue("content",description)
},[description])


      const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
        setIsLoading(true)
       
    
   
        axios.put(`/api/content/${content?.id}/update/content`,data).then(()=>{
          
          router.refresh()
          
          toast.success("Content updated successfully")
        })
        .catch((error)=>{
         
          toast.error(error.message)
        
        }).finally(()=>{
          setIsLoading(false)
        });
    
      }

      
  return (<CModal 
title="Update Lesson Content"
disabled={isLoading}
buttonLabel={isLoading? "Loading...":"Update"}
onClick={handleSubmit(onSubmit)}
modalName="Update">
<div className="p-4">
<TextEditor  value={description? description:content?.content} setValue={setDescription}/>
</div>
</CModal>
    
  )
}

export default UpdateContent;
