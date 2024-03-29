"use client"
import { RemoveFile } from '@/actions/file/removeFile'
import DeleteComponent from '@/components/deleteComponent'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


interface DeleteBannerClientProps{
  banner: any;
}
const DeleteBannerClient:React.FC<DeleteBannerClientProps> = ({banner}) => {
  const [isLoading,setLoading]=useState(false)
  const router=useRouter();
    const onSubmit=()=>{
      setLoading(true);
      axios.delete(`/api/hero/${banner.id}/delete`).then(async()=>{
        
        if(banner.logo){
          await RemoveFile(banner.logo.public_key);
        }
        
        toast.success("banner deleted successfully")
        router.back();
        router.refresh()
        
      }).catch((errors)=>{
        toast.error("something went wrong");
      }).finally(()=>{
        setLoading(false);
      });
     
    
    }
    if(!banner){
      router.back();
      return null;
    }
  return (<DeleteComponent isLoading={isLoading}  onDelete={onSubmit} title={banner.bannerName} />
  )
}

export default DeleteBannerClient