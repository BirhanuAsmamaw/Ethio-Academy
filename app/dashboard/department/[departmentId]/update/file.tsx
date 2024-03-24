"use client"
import { RemoveFile } from '@/actions/file/removeFile';
import FileUploader from '@/components/input/fileUploader'
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';


interface UpdateDepartmentFileProps{
  department: any;
}
const UpdateDepartmentFile:React.FC<UpdateDepartmentFileProps> = ({department}) => {
  const [CoverUrl, setCoverUrl] = useState(department?.cover?department?.cover.public_url:"");
  const [CoverKey, setCoverKey] = useState(department?.cover?department?.cover.public_key:"");

  



  async function handleCoverChange() {
    try {
      const data = await RemoveFile(CoverKey);
      if (data.success) {
        toast.success(data.message);
        setCoverUrl("");
        setCoverKey("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      
      toast.error("An error occurred while removing the file.");
    }
  }


  



 
 
  const ondepartmentCoverComplete=(res:any[]) => {
    const url = res[0]?.url || "";
    const key=res[0]?.key || "";
    setCoverUrl(url);
    setCoverKey(key);
    const coverData={
      public_key:key,
      public_url:url
    }

   axios.put(`/api/department/${department.id}/update/cover`,{cover:coverData}).then(()=>{
    setCoverUrl(department?.cover?department?.cover.public_url:"");
    setCoverKey(department?.cover?department?.cover.public_key:"");
    toast.success("department Cover uploaded successfully")
    }).catch((error)=>{
      toast.error(error.message);
    });
   
  }



  
  return (<div className="w-full p-2 flex justify-center bg-white shadow-md dark:bg-slate-800">
    <div className="space-y-2 w-full text-center">
    
    <h1 className="text-xl font-semibold">{department.subject} Files</h1>
   

      <FileUploader
      onClientUploadComplete={ondepartmentCoverComplete}
      label="Upload department Cover"
        file={CoverUrl}
        handleMediaChange={handleCoverChange}
        endpoint="imageUploader"
        mediaType="image"
      />
       </div>
      </div>

  )
}

export default UpdateDepartmentFile