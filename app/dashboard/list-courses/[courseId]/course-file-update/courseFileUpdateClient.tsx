"use client"
import { RemoveFile } from "@/actions/file/removeFile";
import FileUploader from "@/components/input/fileUploader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CourseFileUpdateClient=()=> {
  const [imageUrl, setImageUrl] = useState("");
  const [imageKey, setImageKey] = useState("");



  async function handleMediaChange() {
    try {
      const data = await RemoveFile(imageKey);
      if (data.success) {
        toast.success(data.message);
        setImageUrl("");
        setImageKey("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      
      toast.error("An error occurred while removing the file.");
    }
  }

  return (
    <div className="space-y-10 w-full">
      <FileUploader
      label="Upload Course Cover"
        file={imageUrl}
        handleMediaChange={handleMediaChange}
        endpoint="imageUploader"
        mediaType="image"
        onUrlChange={(url, key) => {
          setImageUrl(url);
          setImageKey(key);
        }}
      />

<FileUploader
      label="Upload Course Thumbail"
        file={imageUrl}
        handleMediaChange={handleMediaChange}
        endpoint="imageUploader"
        mediaType="image"
        onUrlChange={(url, key) => {
          setImageUrl(url);
          setImageKey(key);
        }}
      />



<FileUploader
      label="Upload Course video"
        file={imageUrl}
        handleMediaChange={handleMediaChange}
        endpoint="imageUploader"
        mediaType="image"
        onUrlChange={(url, key) => {
          setImageUrl(url);
          setImageKey(key);
        }}
      />

      <div className="p-4 w-full flex justify-end">
        <button className="px-4 py-2 rounded-[5px] bg-blue-600 hover:bg-blue-700">Submit</button>
      </div>
    </div>
  );
}

export default CourseFileUpdateClient;