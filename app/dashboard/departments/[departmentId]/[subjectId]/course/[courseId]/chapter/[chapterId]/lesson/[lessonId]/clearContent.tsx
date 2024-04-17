"use client"


import CModal from "@/components/customModal"
import axios from "axios"
import { useRouter } from "next/navigation"
import { MdDelete } from "react-icons/md";
import {  useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"

interface ClearContentProps{
  content:any
 
}
 const ClearContent:React.FC<ClearContentProps>=({content})=> {
 
const [isLoading,setIsLoading]=useState(false)

const router=useRouter();
  const {handleSubmit,reset}=useForm<FieldValues>({
    defaultValues: {
     content:null
      
      }})




      const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
        setIsLoading(true)
       
    
   
        axios.put(`/api/content/${content?.id}/update/content`,data).then(()=>{
        
          router.refresh()
          reset()
          toast.success("Content deleted successfully")
        })
        .catch((error)=>{
         
          toast.error(error.message)
        
        }).finally(()=>{
          setIsLoading(false)
        });
    
      }

      
  return ( <CModal 
    variant="secondary"
title="Clear Content"
disabled={isLoading}
buttonLabel={isLoading? "Loading...":"Clear"}
onClick={handleSubmit(onSubmit)}
modalName={<MdDelete size={24} 
className='text-gray-600
 dark:text-gray-400
 hover:text-gray-900
  hover:dark:text-gray-100 transition'/>}>
<div className="p-4">
<p className="p-4 text-lg">Are You Sure to Delete This Content?</p>
</div>
</CModal>
    
  )
}

export default ClearContent;
