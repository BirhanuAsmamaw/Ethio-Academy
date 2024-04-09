"use client"
import { RemoveFile } from '@/actions/file/removeFile'
import DeleteComponent from '@/components/deleteComponent'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


interface DeleteQustionClientProps{
  question: any;
}
const DeleteQustionClient:React.FC<DeleteQustionClientProps> = ({question}) => {
  const [isLoading,setLoading]=useState(false)
  const router=useRouter();
    const onSubmit=()=>{
      setLoading(true);
      axios.delete(`/api/question/${question.id}/delete`).then(async()=>{
        
        if(question.q_image){
          await RemoveFile(question.q_image.public_key);
        }
        
        toast.success("Question deleted successfully")
        router.push(`/dashboard/departments/${question?.departmentId}/${question?.subjectId}/exam/${question.year}`);
        router.refresh()
        
      }).catch((errors)=>{
        toast.error("something went wrong");
      }).finally(()=>{
        setLoading(false);
      });
     
    
    }
    if(!question){
      router.back();
      return null;
    }
  return (<DeleteComponent isLoading={isLoading}  onDelete={onSubmit} title={question.title} />
  )
}

export default DeleteQustionClient