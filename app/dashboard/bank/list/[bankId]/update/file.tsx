"use client"
import { RemoveFile } from '@/actions/file/removeFile';
import FileUploader from '@/components/input/fileUploader'
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';


interface UpdatebankFileProps{
  bank: any;
}
const UpdateFileFile:React.FC<UpdatebankFileProps> = ({bank}) => {
  const [logoUrl, setlogoUrl] = useState(bank?.logo?bank?.logo.public_url:"");
  const [logoKey, setlogoKey] = useState(bank?.logo?bank?.logo.public_key:"");

  



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


  



 
 
  const onbanklogoComplete=(res:any[]) => {
    const url = res[0]?.url || "";
    const key=res[0]?.key || "";
    setlogoUrl(url);
    setlogoKey(key);
    const logoData={
      public_key:key,
      public_url:url
    }

   axios.put(`/api/bank/${bank.id}/update/file`,{logo:logoData}).then(()=>{
    setlogoUrl(bank?.logo?bank?.logo.public_url:"");
    setlogoKey(bank?.logo?bank?.logo.public_key:"");
    toast.success("bank logo uploaded successfully")
    }).catch((error)=>{
      toast.error(error.message);
    });
   
  }



  
  return (<div className="w-full p-2 flex justify-center bg-white shadow-md dark:bg-slate-800">
    <div className="space-y-2 w-full text-center">
    
    <h1 className="text-xl font-semibold">Update {bank.bankName} Files</h1>
   

      <FileUploader
      onClientUploadComplete={onbanklogoComplete}
      label="Upload bank logo"
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