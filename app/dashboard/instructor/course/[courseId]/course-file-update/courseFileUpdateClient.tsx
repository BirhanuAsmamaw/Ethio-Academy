"use client"
import { RemoveFile } from "@/actions/file/removeFile";
import FileUploader from "@/components/input/fileUploader";
import axios from "axios";
import {  useState } from "react";
import toast from "react-hot-toast";
interface CourseFileUpdateClientProps{
  course: any;
}
const CourseFileUpdateClient:React.FC<CourseFileUpdateClientProps>=({course})=> {
  const [CoverUrl, setCoverUrl] = useState(course?.cover?course?.cover.public_url:"");
  const [CoverKey, setCoverKey] = useState(course?.cover?course?.cover.public_key:"");

  const [thumbnailUrl, setthumbnailUrl] = useState(course?.videoThumbnail?course?.videoThumbnail.public_url:"");
  const [thumbnailKey, setthumbnailKey] = useState(course?.videoThumbnail?course?.videoThumbnail.public_key:"");

  const [VideoUrl, setVideoUrl] = useState(course?.videoUrl?course?.videoUrl?.public_url:"");
  const [VideoKey, setVideoKey] = useState(course?.videoUrl?course?.videoUrl.public_key:"");



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


 
  const onCourseCoverComplete=(res:any[]) => {
    const url = res[0]?.url || "";
    const key=res[0]?.key || "";
    setCoverUrl(url);
    setCoverKey(key);
    const coverData={
      public_key:key,
      public_url:url
    }

   axios.put(`/api/course/${course?.id}/update/cover`,{cover:coverData}).then(()=>{
    setCoverUrl(course?.cover?course?.cover.public_url:"");
    setCoverKey(course?.cover?course?.cover.public_key:"");
    toast.success("Course Cover uploaded successfully")
    }).catch((error)=>{
      toast.error(error.message);
    });
   
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

   axios.put(`/api/course/${course.id}/update/thumbnail`,{thumbnail:thumbnailData}).then(()=>{

    setthumbnailUrl(course?.videoThumbnail?course?.videoThumbnail.public_url:"");
    setthumbnailKey(course?.videoThumbnail?course?.videoThumbnail.public_key:"");
    
    toast.success("Course Thumbnail Uploaded successfully")
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

   axios.put(`/api/course/${course?.id}/update/video`,{video:videoData}).then(()=>{
    toast.success("Video Uploaded successfully")
    setVideoUrl(course?.videoUrl? course?.videoUrl.public_url:"");
    setVideoKey(course?.videoUrl? course?.videoUrl.public_key:"");
    }).catch((error)=>{
      toast.error(error.message);
    });
    
  }
  

  return (
    <div className="space-y-10 w-full">
     <div className="space-y-2 w-full text-center">
    
    <h1 className="text-xl font-semibold">{course?.course} Files</h1>
    </div>

      <FileUploader
      onClientUploadComplete={onCourseCoverComplete}
      label="Upload Course Cover"
        file={CoverUrl}
        handleMediaChange={handleCoverChange}
        endpoint="imageUploader"
        mediaType="image"
      />

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

export default CourseFileUpdateClient;