"use client"
import { RemoveFile } from '@/actions/file/removeFile';
import FileUploader from '@/components/input/fileUploader'
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';


interface UpdatebannerFileProps{
  banner: any;
}
const UpdateFileFile:React.FC<UpdatebannerFileProps> = ({banner}) => {
  const [logoUrl, setlogoUrl] = useState(banner?.logo?banner?.logo.public_url:"");
  const [logoKey, setlogoKey] = useState(banner?.logo?banner?.logo.public_key:"");

  



  async function handlelogoChange() {
    try {
      const data = await RemoveFile(logoKey);
      if (data.success) {
        toast.success(data.message);
        setlogoUrl("");
        setlogoKey("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      
      toast.error("An error occurred while removing the file.");
    }
  }


  



 
 
  const onbannerlogoComplete=(res:any[]) => {
    const url = res[0]?.url || "";
    const key=res[0]?.key || "";
    setlogoUrl(url);
    setlogoKey(key);
    const logoData={
      public_key:key,
      public_url:url
    }

   axios.put(`/api/hero/${banner.id}/update/file`,{logo:logoData}).then(()=>{
    setlogoUrl(banner?.logo?banner?.logo.public_url:"");
    setlogoKey(banner?.logo?banner?.logo.public_key:"");
    toast.success("banner logo uploaded successfully")
    }).catch((error)=>{
      toast.error(error.message);
    });
   
  }



  
  return (<div className="w-full p-2 flex justify-center bg-white shadow-md dark:bg-slate-800">
    <div className="space-y-2 w-full text-center">
    
    <h1 className="text-xl font-semibold">Update {banner.bannerName} Files</h1>
   

      <FileUploader
      onClientUploadComplete={onbannerlogoComplete}
      label="Upload banner logo"
        file={logoUrl}
        handleMediaChange={handlelogoChange}
        endpoint="imageUploader"
        mediaType="image"
      />
       </div>
      </div>

  )
}

export default UpdateFileFile