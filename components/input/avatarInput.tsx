"use client"

import { MdDelete } from "react-icons/md";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import {useDropzone} from 'react-dropzone'
import Image from "next/image";


interface AvatarInputProps{
  
    disabled?:boolean;
    required?:boolean;
    file?:any;
    register:UseFormRegister<FieldValues>;
    errors:FieldErrors;
    
    id:string;
    onDrop:(file:any) => any;
    onCancel?:() => any;
  
  }

const AvatarInput:React.FC<AvatarInputProps> = ({register,required,errors,id,disabled,file,onDrop,onCancel}) => {
    
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    
  return ( 
    <div className="">

        {file&&<div className="overflow-hidden relative top-4 right-4 h-28 w-28">
        <button onClick={onCancel} className="absolute text-rose-400 hover:text-rose-500 transition"><MdDelete size={24}/></button>
                <Image height={40}  width={40} src={file} alt="image" className="rounded-full object-contain"/>
            </div>
        }




   {!file&&<div {...getRootProps()} className="h-28 w-28 rounded-full flex items-center justify-center">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-4 h-4 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload your Avatar</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG  (MAX. 400x400px)</p>
            </div>
            <input disabled={disabled} {...getInputProps()} id={id}  type="file" className={` ${errors[id]? "border border-rose-400":""}`} {...register(id,{required})}/>
        </label>
    </div>} </div>
     );
}
 
export default AvatarInput;