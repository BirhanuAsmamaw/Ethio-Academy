"use client"
import { RemoveFile } from "@/actions/file/removeFile";
import FileUploader from "@/components/input/fileUploader";
import axios from "axios";
import {  useState } from "react";
import toast from "react-hot-toast";
interface UpdateLessonFileClientProps{
  lesson: any;
}
const UpdateLessonFileClient:React.FC<UpdateLessonFileClientProps>=({lesson})=> {


  const [thumbnailUrl, setthumbnailUrl] = useState(lesson?.videoThumbnail.public_url);
  const [thumbnailKey, setthumbnailKey] = useState(lesson?.videoThumbnail.public_key);

  const [VideoUrl, setVideoUrl] = useState(lesson?.videoUrl.public_url);
  const [VideoKey, setVideoKey] = useState(lesson?.videoUrl.public_key);



 

  async function handleThumbnailChange() {
    try {
      const data = await RemoveFile(thumbnailKey);
      if (data.success) {
        toast.success(data.message);
        setthumbnailUrl("");
        setthumbnailKey("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      
      toast.error("An error occurred while removing the file.");
    }
  }



  async function handleVideoChange() {
    try {
      const data = await RemoveFile(VideoKey);
      if (data.success) {
        toast.success(data.message);
        setVideoUrl("");
        setVideoKey("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      
      toast.error("An error occurred while removing the file.");
    }
  }



  const onCourseThumbnailComplete=(res:any[]) => {
    const url = res[0]?.url || "";
    const key=res[0]?.key || "";
    setthumbnailUrl(url);
    setthumbnailKey(key);
    const thumbnailData={
      public_key:key,
      public_url:url
    }

   axios.put(`/api/lesson/${lesson.id}/update/thumbnail`,{thumbnail:thumbnailData}).then(()=>{
   
    setVideoUrl(lesson?.videoThumbnail.public_url);
    setVideoKey(lesson?.videoThumbnail.public_key);
    toast.success("Lesson Thumbnail Uploaded successfully")
    }).catch((error)=>{
      toast.error(error.message);
    });
    
  }

  const onCourseVideoComplete=(res:any[]) => {
    const url = res[0]?.url || "";
    const key=res[0]?.key || "";
    setVideoUrl(url);
    setVideoKey(key);

    const videoData={
      public_key:key,
      public_url:url
    }

   axios.put(`/api/lesson/${lesson.id}/update/video`,{video:videoData}).then(()=>{
    toast.success("Video Uploaded successfully")
    setVideoUrl(lesson?.videoUrl.public_url);
    setVideoKey(lesson?.videoUrl.public_key);
    }).catch((error)=>{
      toast.error(error.message);
    });
    
  }
  

  return (
    <div className="space-y-10 w-full">
     
     

<FileUploader
  onClientUploadComplete={onCourseThumbnailComplete}
      label="Upload Course Thumbail"
        file={thumbnailUrl}
        handleMediaChange={handleThumbnailChange}
        endpoint="imageUploader"
        mediaType="image"
      />



<FileUploader
  onClientUploadComplete={onCourseVideoComplete}
      label="Upload Course video"
        file={VideoUrl}
        handleMediaChange={handleVideoChange}
        endpoint="videoUploader"
        mediaType="video"
        
      />

     
    </div>
  );
}

export default UpdateLessonFileClient;