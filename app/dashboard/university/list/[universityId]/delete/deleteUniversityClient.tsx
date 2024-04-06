"use client"
import { RemoveFile } from '@/actions/file/removeFile'
import DeleteComponent from '@/components/deleteComponent'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


interface DeleteUniversityClientProps{
  university: any;
}
const DeleteUniversityClient:React.FC<DeleteUniversityClientProps> = ({university}) => {
  const [isLoading,setLoading]=useState(false)
  const router=useRouter();
    const onSubmit=()=>{
      setLoading(true);
      axios.delete(`/api/university/${university.id}/delete`).then(async()=>{
        
        if(university.logo){
          await RemoveFile(university.logo.public_key);
        }
        
        toast.success("University deleted successfully")
        router.back();
        router.refresh()
        
      }).catch((errors)=>{
        toast.error("something went wrong");
      }).finally(()=>{
        setLoading(false);
      });
     
    
    }
    if(!university){
      router.back();
      return null;
    }
  return (<DeleteComponent isLoading={isLoading}  onDelete={onSubmit} title={university.name} />
  )
}

export default DeleteUniversityClient