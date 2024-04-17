"use client"
import { RemoveFile } from '@/actions/file/removeFile';
import CModal from '@/components/customModal';
import FileUploader from '@/components/input/fileUploader'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';


interface UpdatecontentFileProps{
  content: any;
  departmentId: string;
  subjectId: string;
  courseId: string;
  chapterId: string;
}
const UpdateContentImage:React.FC<UpdatecontentFileProps> = ({content,departmentId,subjectId,courseId,chapterId}) => {
  const [imageUrl, setimageUrl] = useState(content?.image?content?.image.public_url:"");
  const [imageKey, setimageKey] = useState(content?.image?content?.image.public_key:"");

  const router=useRouter();



  async function handleimageChange() {
    try {
      const data = await RemoveFile(imageKey);
      if (data.success) {
        toast.success(data.message);
        setimageUrl("");
        setimageKey("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      
      toast.error("An error occurred while removing the file.");
    }
  }


  



 
 
  const oncontentimageComplete=(res:any[]) => {
    const url = res[0]?.url || "";
    const key=res[0]?.key || "";
    setimageUrl(url);
    setimageKey(key);
    const imageData={
      public_key:key,
      public_url:url
    }

   axios.put(`/api/content/${content.id}/update/file`,{image:imageData}).then(()=>{
    setimageUrl(content?.image?content?.image.public_url:"");
    setimageKey(content?.image?content?.image.public_key:"");
    router.push(`/dashboard/departments/${departmentId}/${subjectId}/course/${courseId}/chapter/${chapterId}/lesson/${content.lessonId}/update-content`)
    router.refresh();
    toast.success("content image uploaded successfully")
    }).catch((error)=>{
      toast.error(error.message);
    });
   
  }



  
  return (
    <CModal 
title="Update Content Image"
modalName="Upload Image">
 <FileUploader
      onClientUploadComplete={oncontentimageComplete}
      label="Upload content image"
        file={imageUrl}
        handleMediaChange={handleimageChange}
        endpoint="imageUploader"
        mediaType="image"
      />
</CModal>
  
  
 
  )
}

export default UpdateContentImage