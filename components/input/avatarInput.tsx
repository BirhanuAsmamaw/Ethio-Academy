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
    toast.error("error occurred!");
   
  }
 

 

  return (
    <div>
      <section className="  relative ">
        <div className="flex justify-between items-center">
          <h2 className={`${file&&'hidden'} text-lg font-bold`}>{label}</h2>
          {file&& (
            <button
              onClick={handleMediaChange}
              className="absolute z-40 text-cyan-600 hover:text-black
                dark:hover:text-white   bottom-5 right-2 "
            >
              <BiSolidEdit size={28} className=" drop-shadow-md"/>
            </button>
          )}
        </div>
        {file? (
          
          
            <Avatar className={` h-28 w-28`}>
            <AvatarImage src={file} alt="image" />
            <AvatarFallback className="text-black dark:text-white font-medium text-[12px]">profile</AvatarFallback>
          </Avatar>
          
        ) : (
         
          <UploadDropzone
          className="bg-slate-100  truncate rounded-full text-sm  items-center text-center  text-wrap  dark:bg-slate-800 ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300"
          endpoint={endpoint}
          onClientUploadComplete={onClientUploadComplete}
          onUploadError={errorHandle}
          appearance={{
            button:{
              padding:"1px",
              fontSize:"12px",
               
                borderRadius:"5px",
               
                 backgroundColor:"#0284c7",
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


