"use client"
import { RemoveFile } from '@/actions/file/removeFile'
import DeleteComponent from '@/components/deleteComponent'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


interface DeleteBankClientProps{
  bank: any;
}
const DeleteBankClient:React.FC<DeleteBankClientProps> = ({bank}) => {
  const [isLoading,setLoading]=useState(false)
  const router=useRouter();
    const onSubmit=()=>{
      setLoading(true);
      axios.delete(`/api/bank/${bank.id}/delete`).then(async()=>{
        
        if(bank.logo){
          await RemoveFile(bank.logo.public_key);
        }
        
        toast.success("bank deleted successfully")
        router.back();
        router.refresh()
        
      }).catch((errors)=>{
        toast.error("something went wrong");
      }).finally(()=>{
        setLoading(false);
      });
     
    
    }
    if(!bank){
      router.back();
      return null;
    }
  return (<DeleteComponent isLoading={isLoading}  onDelete={onSubmit} title={bank.bankName} />
  )
}

export default DeleteBankClient