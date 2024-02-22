"use client"

import { useCallback } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import {useDropzone} from 'react-dropzone'


interface InputFileProps{
  
    disabled?:boolean;
    required?:boolean;
   
    register:UseFormRegister<FieldValues>;
    errors:FieldErrors;
    id:string;
    onDrop:(file:any) => any;
  
  }

const FileInput:React.FC<InputFileProps> = ({register,required,errors,id,disabled,onDrop}) => {
    
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    
  return ( 
    <div {...getRootProps()} className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-4 h-4 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input {...getInputProps()} id={id}  type="file" className={` ${errors[id]? "border border-rose-400":""}`} {...register(id,{required})}/>
        </label>
    </div> 
     );
}
 
export default FileInput;