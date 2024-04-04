"use client"
import { RemoveFile } from '@/actions/file/removeFile'
import DeleteComponent from '@/components/deleteComponent'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


interface DeletesubjectClientProps{
  subject: any;
}
const DeleteSubjectClient:React.FC<DeletesubjectClientProps> = ({subject}) => {
  const [isLoading,setLoading]=useState(false)
  const router=useRouter();
    const onSubmit=()=>{
      setLoading(true);
      axios.delete(`/api/subject/${subject.id}/delete`).then(async()=>{
        
        if(subject.cover){
          await RemoveFile(subject.cover.public_key);
        }
        
        toast.success("subject deleted successfully")
        router.push("/dashboard/exam-questions/Remedial");
        router.refresh()
        
      }).catch((errors)=>{
        toast.error("something went wrong");
      }).finally(()=>{
        setLoading(false);
      });
     
    
    }
    if(!subject){
      router.back();
      return null;
    }
  return (<DeleteComponent isLoading={isLoading}  onDelete={onSubmit} title={subject.subjectName} />
  )
}

export default DeleteSubjectClient