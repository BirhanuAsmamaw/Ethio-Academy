"use client"
import { RemoveFile } from '@/actions/file/removeFile';
import FileUploader from '@/components/input/fileUploader'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';


interface UpdatesubjectFileProps{
  subject: any;
}
const UpdateSubjectFile:React.FC<UpdatesubjectFileProps> = ({subject}) => {
  const [coverUrl, setcoverUrl] = useState(subject?.cover? subject?.cover.public_url:"");
  const [coverKey, setcoverKey] = useState(subject?.cover?subject?.cover.public_key:"");
  const [bannerUrl, setbannerUrl] = useState(subject?.banner? subject?.banner.public_url:"");
  const [bannerKey, setbannerKey] = useState(subject?.banner?subject?.banner.public_key:"");

  const router=useRouter();
  



  async function handlecoverChange() {
    try {
      const data = await RemoveFile(coverKey);
      if (data.success) {
        toast.success(data.message);
        setcoverUrl("");
        setcoverKey("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      
      toast.error("An error occurred while removing the file.");
    }
  }



  async function handlebannerChange() {
    try {
      const data = await RemoveFile(bannerKey);
      if (data.success) {
        toast.success(data.message);
        setbannerUrl("");
        setbannerKey("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      
      toast.error("An error occurred while removing the file.");
    }
  }
  



 
 
  const onsubjectcoverComplete=(res:any[]) => {
    const url = res[0]?.url || "";
    const key=res[0]?.key || "";
    setcoverUrl(url);
    setcoverKey(key);
    const coverData={
      public_key:key,
      public_url:url
    }

   axios.put(`/api/subject/${subject.id}/update/file/cover`,{cover:coverData}).then(()=>{
    setcoverUrl(subject?.cover?subject?.cover.public_url:"");
    setcoverKey(subject?.cover?subject?.cover.public_key:"");
    toast.success("subject image uploaded successfully")
    router.back()
    router.refresh();
    }).catch((error)=>{
      toast.error(error.message);
    });
   
  }






  const onsubjectbannerComplete=(res:any[]) => {
    const url = res[0]?.url || "";
    const key=res[0]?.key || "";
    setbannerUrl(url);
    setbannerKey(key);
    const bannerData={
      public_key:key,
      public_url:url
    }

   axios.put(`/api/subject/${subject.id}/update/file/banner`,{banner:bannerData}).then(()=>{
    setbannerUrl(subject?.banner?subject?.banner.public_url:"");
    setbannerKey(subject?.banner?subject?.banner.public_key:"");
    toast.success("subject image uploaded successfully")
    router.back()
    router.refresh();
    }).catch((error)=>{
      toast.error(error.message);
    });
   
  }

  
  return (<div className="w-full p-2 flex justify-center bg-white shadow-md dark:bg-slate-800">
    <div className="space-y-2 w-full text-center">
    
    <h1 className="text-lg ">Update <span className=' text-sm'>{subject.subjectName}</span> Files</h1>
   

      <FileUploader
      onClientUploadComplete={onsubjectcoverComplete}
      label="Upload subject cover"
        file={coverUrl}
        handleMediaChange={handlecoverChange}
        endpoint="imageUploader"
        mediaType="image"
      />



<FileUploader
      onClientUploadComplete={onsubjectbannerComplete}
      label="Upload subject banner"
        file={bannerUrl}
        handleMediaChange={handlebannerChange}
        endpoint="imageUploader"
        mediaType="image"
      />
       </div>
      </div>

  )
}

export default UpdateSubjectFile