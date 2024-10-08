"use client"
import { RemoveFile } from '@/actions/file/removeFile'
import DeleteComponent from '@/components/deleteComponent'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


interface DeleteExamTypeClientProps{
  exam: any;
}
const DeleteExamTypeClient:React.FC<DeleteExamTypeClientProps> = ({exam}) => {
  const [isLoading,setLoading]=useState(false)
  const router=useRouter();
    const onSubmit=()=>{
      setLoading(true);
      axios.delete(`/api/examCategory/${exam.id}/delete`).then(async()=>{
        
        if(exam.cover){
          await RemoveFile(exam.cover.public_key);
        }
        
        toast.success("Exams Category deleted successfully")
        router.back();
        router.refresh()
        
      }).catch((errors)=>{
        toast.error("something went wrong");
      }).finally(()=>{
        setLoading(false);
      });
     
    
    }


    if(!exam){
      router.back();
      return null;
    }
  return (<DeleteComponent isLoading={isLoading} onDelete={onSubmit} title={exam.examType} />
  )
}

export default DeleteExamTypeClient