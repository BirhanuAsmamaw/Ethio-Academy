
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

interface FileUploaderProps{
  label:string;
  endpoint:any;
  file?:any;
  handleMediaChange?:() => void;
   mediaType:string;
    
    onClientUploadComplete:(res:any[]) => void;
}
const FileUploader:React.FC<FileUploaderProps>=({handleMediaChange,onClientUploadComplete,label,file ,endpoint, mediaType })=> {


 

 

  const errorHandle=(error: Error) => {
    // Do something with the error.
    toast.error(error.message);
   
  }

  return (
    <div>
      <section className="w-full lg:max-w-4xl mx-auto my-8 p-4  bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{label}</h2>
          {file&& (
            <button
              onClick={handleMediaChange}
              className="bg-slate-800 text-white py-2 px-4 rounded"
            >
              Change
            </button>
          )}
        </div>
        {file? (
          mediaType === "image" ? (
            <Image src={file} alt="uploaded image" width={300} height={300} />
          ) : (
            <video controls width={300}>
              <source src={file} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )
        ) : (
          <UploadDropzone
            className="bg-slate-100 dark:bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
            endpoint={endpoint}
            onClientUploadComplete={onClientUploadComplete}
            onUploadError={errorHandle}
          />
        )}
      </section>
    </div>
  );
}

export default FileUploader;