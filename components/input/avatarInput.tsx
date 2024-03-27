
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface FileUploaderProps{
  label:string;
  endpoint:any;
  file:any;
  handleMediaChange:() => void;
  
    
    onClientUploadComplete:(res:any[]) => void;
}
const AvatarUploader:React.FC<FileUploaderProps>=({handleMediaChange,onClientUploadComplete,label,file ,endpoint})=> {


 

 

  const errorHandle=(error: Error) => {
    // Do something with the error.
    toast.error(error.message);
   
  }

  return (
    <div>
      <section className="w-full lg:max-w-4xl mx-auto my-8 p-4  bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center">
          <h2 className={`${file&&'hidden'} text-lg font-bold`}>{label}</h2>
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
          
          
            <Avatar className={` h-28 w-28`}>
            <AvatarImage src={file} alt="image" />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          
        ) : (
          <div className="h-32 w-32 rounded-full overflow-hidden p-1">
            <UploadDropzone
            className="bg-slate-100 dark:bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
            endpoint={endpoint}
            onClientUploadComplete={onClientUploadComplete}
            onUploadError={errorHandle}
          />
          </div>
        )}
      </section>
    </div>
  );
}

export default AvatarUploader;