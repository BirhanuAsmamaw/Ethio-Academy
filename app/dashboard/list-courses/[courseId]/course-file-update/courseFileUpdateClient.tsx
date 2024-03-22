"use client"
import { RemoveFile } from "@/actions/file/removeFile";
import FileUploader from "@/components/input/fileUploader";
import {  useState } from "react";
import toast from "react-hot-toast";

const CourseFileUpdateClient=()=> {
  const [CoverUrl, setCoverUrl] = useState("");
  const [CoverKey, setCoverKey] = useState("");

  const [thumbnailUrl, setthumbnailUrl] = useState("");
  const [thumbnailKey, setthumbnailKey] = useState("");

  const [VideoUrl, setVideoUrl] = useState("");
  const [VideoKey, setVideoKey] = useState("");



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
    toast.success("Course Cover uploaded successfully")
  }


  const onCourseThumbnailComplete=(res:any[]) => {
    const url = res[0]?.url || "";
    const key=res[0]?.key || "";
    setthumbnailUrl(url);
    setthumbnailKey(key);
    toast.success("Course Thumbnail Uploaded successfully")
  }

  const onCourseVideoComplete=(res:any[]) => {
    const url = res[0]?.url || "";
    const key=res[0]?.key || "";
    setVideoUrl(url);
    setVideoKey(key);
    toast.success("Video Uploaded successfully")
  }
  

  return (
    <div className="space-y-10 w-full">
      <h6>cover url:- {CoverUrl}</h6>
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
        endpoint="imageUploader"
        mediaType="image"
        
      />

      <div className="p-4 w-full flex justify-end">
        <button className="px-4 py-2 rounded-[5px] bg-blue-600 hover:bg-blue-700">Submit</button>
      </div>
    </div>
  );
}

export default CourseFileUpdateClient;