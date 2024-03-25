"use client"
import DeleteComponent from '@/components/deleteComponent'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const ExamTypeDelete = ({params}:{params:{examTypeId:string}}) => {
  const [isLoading,setLoading]=useState(false)
  const router=useRouter();
    const onSubmit=()=>{
      setLoading(true);
      axios.delete(`/api/examCategory/${params.examTypeId}/delete`).then(()=>{
        toast.success("Department deleted successfully")
        router.refresh()
        
      }).catch((errors)=>{
        toast.error("something went wrong");
      }).finally(()=>{
        setLoading(false);
      });
     
    
    }
  return (<DeleteComponent onDelete={onSubmit} title={'Delete This Exam type'} label={'Delete'}/>
  )
}

export default ExamTypeDelete