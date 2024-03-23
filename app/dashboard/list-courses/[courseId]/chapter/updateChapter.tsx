"use client"

import Input from "@/components/input/input";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosSend} from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
interface UpdateChapterProps{
  chapter:any;
}
const UpdateChapter:React.FC<UpdateChapterProps> = ({chapter}) => {
  const [isLoading,setLoading]=useState(false)
  const [isUpdate,setUpdate]=useState(false)
  const router=useRouter();
const {register,handleSubmit,reset,formState:{errors}}=useForm<FieldValues>({
  defaultValues:{
    title:chapter.title,
  }
  
});
const onUpdateChapter=()=>{
setUpdate((prev)=>!prev)
}

  const onSubmit:SubmitHandler<FieldValues>=(data)=>{
    setLoading(true);
    axios.put(`/api/chapter/${chapter.id}`,data).then(()=>{
      toast.success("Chapter updated successfully")
      router.refresh()
      reset();
    }).catch((errors)=>{
      toast.error("something went wrong");
    }).finally(()=>{
      setLoading(false);
    });
   
  
  }
  return ( <div className="space-y-2">
    
      <button   
      onClick={onUpdateChapter}
      className="py-2 md:py-2.5 px-3 md:px-5 me-2 mb-2
  text-sm font-medium text-gray-900 focus:outline-none
   bg-white rounded-full border border-gray-200 
   hover:bg-gray-100 hover:text-blue-700 focus:z-10 
   focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700
    dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
     dark:hover:text-white dark:hover:bg-gray-700 flex gap-2 items-center justify-center"><MdModeEdit size={24}/> <p>Update Chapter</p></button>

  

    {isUpdate?<div className="flex w-full justify-center gap-1">
      
      <div className="w-8/12">
      <Input
      
      id="title"
      label="Update Chapter Title"
      required
      defaultValue={chapter.title}
      register={register}
      errors={errors}
      disabled={isLoading}
      type="text"
      />
      </div>
       <div className="flex pt-4 justify-center  items-center">
      <button onClick={handleSubmit(onSubmit)} className="text-gray-500 dark:text-gray-400 font-bold hover:text-blue-500 hover:dark:text-blue-400 transition  duration-300"><IoIosSend size={40}/></button>
       </div>
      </div>:""
    }
  </div>
  
  
   );
}
 
export default UpdateChapter;