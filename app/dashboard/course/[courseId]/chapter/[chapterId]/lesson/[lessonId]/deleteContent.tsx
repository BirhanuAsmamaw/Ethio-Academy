"use client"

import { RemoveFile } from "@/actions/file/removeFile"
import CModal from "@/components/customModal"
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
    <CModal 
    variant="destructive"
title="Delete Lesson Content"
disabled={isLoading}
buttonLabel={isLoading? "Loading...":"Delete"}
onClick={onSubmit}
modalName="Delete">
<div className="p-4">
<p className="p-4 text-lg">Are You Sure to Delete This  Lesson Content?</p>
</div>
</CModal>
  )
}

export default DeleteContent;