"use client"
import { FaRegTrashCan } from "react-icons/fa6";
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
    variant="ghost"

disabled={isLoading}
buttonLabel={isLoading? "Deleting...":"Delete"}
className=" rounded-none
   p-2"
onClick={onSubmit}
modalName={<FaRegTrashCan className="text-red-500" size={20}/>}>
<div className="p-4">
<p className="p-4 text-lg font-medium ">Are You Sure to <span className="text-rose-600">Delete </span> This  Lesson Content?</p>
</div>
</CModal>
  )
}

export default DeleteContent;