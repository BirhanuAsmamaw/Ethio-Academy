"use client"
import { RemoveFile } from '@/actions/file/removeFile';
import AvatarUploader from '@/components/input/avatarInput';
import FileUploader from '@/components/input/fileUploader'
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';


interface UpdateTeacherLogoProps{
  user: any;
}
const UpdateTeacherLogo:React.FC<UpdateTeacherLogoProps> = ({user}) => {
  const [LogoUrl, setLogoUrl] = useState(user?.teacher.logo?user?.teacher.logo.public_url:"");
  const [LogoKey, setLogoKey] = useState(user?.teacher.logo?user?.teacher.logo.public_key:"");

  



  async function handleLogoChange() {
    try {
      const data = await RemoveFile(LogoKey);
      if (data.success) {
        toast.success(data.message);
        setLogoUrl("");
        setLogoKey("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      
      toast.error("An error occurred while removing the file.");
    }
  }


  



 
 
  const onuserLogoComplete=(res:any[]) => {
    const url = res[0]?.url || "";
    const key=res[0]?.key || "";
    setLogoUrl(url);
    setLogoKey(key);
    const LogoData={
      public_key:key,
      public_url:url
    }

   axios.put(`/api/teacher/update/logo`,{logo:LogoData}).then(()=>{
    setLogoUrl(user?.teacher?.logo?user?.teacher?.logo.public_url:"");
    setLogoKey(user?.teacher?.logo?user?.teacher?.logo.public_key:"");
    toast.success("user Logo uploaded successfully")
    }).catch((error)=>{
      toast.error(error.message);
    });
   
  }

if(!user?.teacher){
  return null;
}

  
  return (<AvatarUploader
      onClientUploadComplete={onuserLogoComplete}
        file={LogoUrl}
        handleMediaChange={handleLogoChange}
        endpoint="imageUploader"
        
      />
      

  )
}

export default UpdateTeacherLogo