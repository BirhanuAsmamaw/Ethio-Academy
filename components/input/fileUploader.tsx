
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { BiSolidEdit } from "react-icons/bi";
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
      <section className="w-full z-0 lg:max-w-4xl mx-auto my-8 p-4  relative bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{label}</h2>
          {file&& (
            <button
              onClick={handleMediaChange}
              className=" text-blue-600 dark:text-green-400"
            >
              <BiSolidEdit size={30}/>
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
            className=" dark:bg-gray-700 z-0 bg-slate-50 ut-allowed-content:ut-uploading:text-red-300"
            endpoint={endpoint}
            onClientUploadComplete={onClientUploadComplete}
            onUploadError={errorHandle}
            appearance={{
              button:{
                fontSize:"14px",
                paddingRight:"1px",
                paddingLeft:"1px"

              },
              container:{
               
              }
            }}
          />
        )}
      </section>
    </div>
  );
}

export default FileUploader;