"use client"

import { RemoveFile } from '@/actions/file/removeFile';
import DeleteComponent from '@/components/deleteComponent';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface DeleteUserClientPageProps{
  user:any
}
const DeleteUserClientPage:React.FC<DeleteUserClientPageProps>= ({user}) => {
  const [isLoading,setLoading]=useState(false)
  const router=useRouter();
    const onSubmit=()=>{
      setLoading(true);
      axios.delete(`/api/user/${user.id}/delete`).then(async()=>{
        
        if(user.image && user.image_key){
          await RemoveFile(user.image_key);
        }
        
        toast.success("user deleted successfully")
        router.push("/dashboard/user-list");
        router.refresh()
        
      }).catch((errors)=>{
        toast.error("something went wrong");
      }).finally(()=>{
        setLoading(false);
      });
     
    
    }
    if(!user){
      router.back();
      return null;
    }
  return (<DeleteComponent isLoading={isLoading}  onDelete={onSubmit} title={user.name} />
  )
}

export default DeleteUserClientPage