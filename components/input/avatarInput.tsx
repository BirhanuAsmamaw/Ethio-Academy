"use client"
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BiSolidEdit } from "react-icons/bi";
import { UploadDropzone } from "@/utils/uploadthing";
import toast from "react-hot-toast";

interface FileUploaderProps{
  label?:string;
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
      <section className="  relative ">
        <div className="flex justify-between items-center">
          <h2 className={`${file&&'hidden'} text-lg font-bold`}>{label}</h2>
          {file&& (
            <button
              onClick={handleMediaChange}
              className="absolute text-gray-600 hover:text-black
               dark:text-gray-400 dark:hover:text-white  z-30 bottom-5 right-1 "
            >
              <BiSolidEdit size={24}/>
            </button>
          )}
        </div>
        {file? (
          
          
            <Avatar className={` h-28 w-28`}>
            <AvatarImage src={file} alt="image" />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          
        ) : (
         
          <UploadDropzone
          className="bg-slate-100 rounded-full text-sm  items-center text-center  text-wrap  dark:bg-slate-800 ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300"
          endpoint={endpoint}
          onClientUploadComplete={onClientUploadComplete}
          onUploadError={errorHandle}
          appearance={{
            button:{
              padding:"1px",
              fontSize:"12px",
             
              zIndex:"10px",
              position:"absolute",
              bottom:"2px",
              right:"0"
            },
            container:{
              height:"120px",
              padding:"2px",
              fontSize:"10px",
              width:"120px"
            },
            
          }}
        />
          
        
         
        )}
      </section>
    </div>
  );
}

export default AvatarUploader;


