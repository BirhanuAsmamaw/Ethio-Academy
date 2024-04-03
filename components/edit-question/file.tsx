"use client"
import { RemoveFile } from '@/actions/file/removeFile';
import FileUploader from '@/components/input/fileUploader'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';


interface UpdateQuestionFileProps{
  question: any;
}
const UpdateQuestionFile:React.FC<UpdateQuestionFileProps> = ({question}) => {
  const [q_imageUrl, setq_imageUrl] = useState(question?.q_image? question?.q_image.public_url:"");
  const [q_imageKey, setq_imageKey] = useState(question?.q_image?question?.q_image.public_key:"");

  const router=useRouter();
  



  async function handleq_imageChange() {
    try {
      const data = await RemoveFile(q_imageKey);
      if (data.success) {
        toast.success(data.message);
        setq_imageUrl("");
        setq_imageKey("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      
      toast.error("An error occurred while removing the file.");
    }
  }


  



 
 
  const onQuestionq_imageComplete=(res:any[]) => {
    const url = res[0]?.url || "";
    const key=res[0]?.key || "";
    setq_imageUrl(url);
    setq_imageKey(key);
    const q_imageData={
      public_key:key,
      public_url:url
    }

   axios.put(`/api/question/${question.id}/update/file`,{image:q_imageData}).then(()=>{
    setq_imageUrl(question?.q_image?question?.q_image.public_url:"");
    setq_imageKey(question?.q_image?question?.q_image.public_key:"");
    toast.success("Question image uploaded successfully")
    router.refresh();
    }).catch((error)=>{
      toast.error(error.message);
    });
   
  }



  
  return (<div className="w-full p-2 flex justify-center bg-white shadow-md dark:bg-slate-800">
    <div className="space-y-2 w-full text-center">
    
    <h1 className="text-lg ">Update <span className=' text-sm'>{question.title}</span> Files</h1>
   

      <FileUploader
      onClientUploadComplete={onQuestionq_imageComplete}
      label="Upload Question q_image"
        file={q_imageUrl}
        handleMediaChange={handleq_imageChange}
        endpoint="imageUploader"
        mediaType="image"
      />
       </div>
      </div>

  )
}

export default UpdateQuestionFile