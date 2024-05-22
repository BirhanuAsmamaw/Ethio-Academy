"use client"
import { RemoveFile } from '@/actions/file/removeFile'
import AvatarUploader from '@/components/input/avatarInput'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const EditAvatar = ({user}:{user:any}) => {

  const router=useRouter();
  const [imageUrl, setImageUrl] = useState((user?.image&&user?.image_key)? user?.image:"");
  const [imageKey, setImageKey] = useState(user?.image_key? user?.image_key:"");






  async function handleCoverChange() {
    try {
      if(user.image&&user.image_key){
        const data = await RemoveFile(user.image_key);
        axios.put(`/api/user/deleteImageKey`).then(()=>{
          router.push("/dashboard/profile")
          router.refresh();
        })
       
      if (data.success) {
        toast.success(data.message);
        setImageUrl("");
        setImageKey("");
      } else {
        toast.error(data.message);
      }
      }
    } catch (error) {
      
      toast.error("An error occurred while removing the file.");
    }
  }








  const onUserCoverComplete=(res:any[]) => {
    const url = res[0]?.url || "";
    const key=res[0]?.key || "";
    setImageUrl(url);
    setImageKey(key);
    const imageData={
      image_key:key,
      image:url
    }


   axios.put(`/api/user/updatePhoto`,{image:imageData.image,image_key:imageData.image_key}).then(()=>{
    setImageUrl(user?.image?user?.image:"");
    setImageKey(user?.image_key?user?.image_key:"");
    router.push("/dashboard/profile")
    router.refresh();
    toast.success("Your Image Updated  successfully")
    }).catch((error)=>{
      toast.error(error.message);
    });
   
  }

   
  


  return (<div className="relative">
    <AvatarUploader
    onClientUploadComplete={onUserCoverComplete}
    label="Upload Your Photo"
      file={imageUrl?imageUrl:user.image_key&&user.image?user.image:''}
      handleMediaChange={handleCoverChange}
      endpoint="imageUploader"
     
    />
  </div>
  )
}

export default EditAvatar