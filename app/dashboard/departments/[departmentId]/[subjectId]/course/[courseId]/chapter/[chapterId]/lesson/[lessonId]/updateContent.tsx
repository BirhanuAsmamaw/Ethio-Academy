"use client"


import CModal from "@/components/customModal"
import TextEditor from "@/components/editor/editor"
import axios from "axios"
import { useRouter } from "next/navigation"
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { MdModeEditOutline } from "react-icons/md";
interface UpdateContentProps{
  content:any
  isAdd?:boolean
}
 const UpdateContent:React.FC<UpdateContentProps>=({isAdd,content})=> {
  const [description, setDescription]=useState<string|null>(null)
const [isLoading,setIsLoading]=useState(false)

const router=useRouter();
  const {handleSubmit,setValue,reset}=useForm<FieldValues>({
    defaultValues: {
     content:description||content?.content
      
      }})

useEffect(()=>{
  setValue("content",description||content?.content)
},[description])


      const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
        setIsLoading(true)
       
    
   
        axios.put(`/api/content/${content?.id}/update/content`,data).then(()=>{
        
          router.refresh()
          reset()
          toast.success("Content updated successfully")
        })
        .catch((error)=>{
         
          toast.error(error.message)
        
        }).finally(()=>{
          setIsLoading(false)
        });
    
      }

      
  return (<CModal 
    variant="secondary"
title={`${isAdd?"Add":"Update"}Lesson Content`}
disabled={isLoading}
buttonLabel={isLoading? "Loading...":"Update"}
onClick={handleSubmit(onSubmit)}
modalName={isAdd?<IoMdAdd 
  className='text-gray-600
  dark:text-gray-400
  hover:text-gray-900
   hover:dark:text-gray-100 transition'
size={24}/>:<MdModeEditOutline
className='text-gray-600
dark:text-gray-400
hover:text-gray-900
 hover:dark:text-gray-100 transition'
 size={24}/>}>
<div className="p-4">
<TextEditor  value={description? description:content?.content} setValue={setDescription}/>
</div>
</CModal>
    
  )
}

export default UpdateContent;
