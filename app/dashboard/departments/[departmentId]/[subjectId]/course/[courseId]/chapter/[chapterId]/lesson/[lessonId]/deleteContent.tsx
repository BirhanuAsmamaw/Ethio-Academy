"use client"

import { RemoveFile } from "@/actions/file/removeFile"
import DeleteComponent from "@/components/deleteComponent"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios"
import { useRouter } from "next/navigation"

import { useState } from "react"
import toast from "react-hot-toast"


interface DeleteContentProps{
  content:any
}
 const DeleteContent:React.FC<DeleteContentProps>=({content})=> {

  const [isLoading,setLoading]=useState(false)
  const router=useRouter();
    const onSubmit=()=>{
      setLoading(true);
      axios.delete(`/api/content/${content.id}/delete`).then(async()=>{
        
        if(content.image){
          await RemoveFile(content.image.public_key);
        }
        
        toast.success("content deleted successfully")
        router.refresh()
        
      }).catch((errors)=>{
        toast.error("something went wrong");
      }).finally(()=>{
        setLoading(false);
      });
     
    
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
       <button>Delete</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
      <DeleteComponent isLoading={isLoading}  onDelete={onSubmit} title="Lesson Content"/>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteContent;