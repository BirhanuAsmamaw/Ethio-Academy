"use client"

import Button from "@/components/button/button"
import TextEditor from "@/components/editor/editor"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios"
import { useRouter } from "next/navigation"

import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"

interface UpdateContentProps{
  content:any
}
 const UpdateContent:React.FC<UpdateContentProps>=({content})=> {
  const [description, setDescription]=useState<string|null>(null)
const [isLoading,setIsLoading]=useState(false)

const router=useRouter();
  const {handleSubmit}=useForm<FieldValues>({
    defaultValues: {
     content:description||content?.content
      
      }})




      const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
        setIsLoading(true)
       
    
   
        axios.put(`/api/content/${content?.id}/update/content`,data).then(()=>{
          router.refresh()
          
          toast.success("Course updated successfully")
        })
        .catch((error)=>{
         
          toast.error(error.message)
        
        }).finally(()=>{
          setIsLoading(false)
        });
    
      }

      
  return (
    <Dialog>
      <DialogTrigger asChild>
       <button>Edit</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Lesson Content</DialogTitle>
       
        </DialogHeader>
        <div className="">
   
        <TextEditor  value={description? description:content?.content} setValue={setDescription}/>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit(onSubmit)} isDisabled={isLoading} title={isLoading?"Loading...":"Update"}/>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateContent;