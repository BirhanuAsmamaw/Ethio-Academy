"use client"
import { RemoveFile } from '@/actions/file/removeFile';
import FileUploader from '@/components/input/fileUploader'
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';


interface UpdateExamFileProps{
  exam: any;
}
const UpdateExamFile:React.FC<UpdateExamFileProps> = ({exam}) => {
  const [CoverUrl, setCoverUrl] = useState(exam?.cover?exam?.cover.public_url:"");
  const [CoverKey, setCoverKey] = useState(exam?.cover?exam?.cover.public_key:"");

  



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


  



 
 
  const onExamCoverComplete=(res:any[]) => {
    const url = res[0]?.url || "";
    const key=res[0]?.key || "";
    setCoverUrl(url);
    setCoverKey(key);
    const coverData={
      public_key:key,
      public_url:url
    }

   axios.put(`/api/examCategory/${exam.id}/update/file`,{cover:coverData}).then(()=>{
    setCoverUrl(exam?.cover?exam?.cover.public_url:"");
    setCoverKey(exam?.cover?exam?.cover.public_key:"");
    toast.success("Exam Cover uploaded successfully")
    }).catch((error)=>{
      toast.error(error.message);
    });
   
  }



  
  return (<div className="w-full p-2 flex justify-center bg-white shadow-md dark:bg-slate-800">
    <div className="space-y-2 w-full text-center">
    
    <h1 className="text-xl font-semibold">Update {exam.examType} Files</h1>
   

      <FileUploader
      onClientUploadComplete={onExamCoverComplete}
      label="Upload Exam Cover"
        file={CoverUrl}
        handleMediaChange={handleCoverChange}
        endpoint="imageUploader"
        mediaType="image"
      />
       </div>
      </div>

  )
}

export default UpdateExamFile