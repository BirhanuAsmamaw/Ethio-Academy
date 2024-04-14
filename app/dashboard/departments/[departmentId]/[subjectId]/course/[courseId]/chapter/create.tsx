"use client"

import Input from "@/components/input/input";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosSend, IoMdAdd } from "react-icons/io";
interface CreateChapterProps{
  course:any;
}
const CreateChapter:React.FC<CreateChapterProps> = ({course}) => {
  const [isLoading,setLoading]=useState(false)
  const [isAdd,setAdd]=useState(false)
  const router=useRouter();
const {register,handleSubmit,reset,formState:{errors}}=useForm<FieldValues>({
  defaultValues:{
    title:"",
    courseId:course.id,
  }
  
});
const onAddChapter=()=>{
setAdd((prev)=>!prev)
}

  const onSubmit:SubmitHandler<FieldValues>=(data)=>{
    setLoading(true);
    axios.post('/api/chapter',data).then(()=>{
      toast.success("Course Chapter  created  successfully")
      router.refresh()
      reset();
    }).catch((errors)=>{
      toast.error("something went wrong");
    }).finally(()=>{
      setLoading(false);
    });
   
  
  }
  return ( <div className="space-y-2">
    <div className="flex flex-col md:flex-row w-full px-4 justify-between">
      <h2 className="text-lg font-semibold">{course?.course}</h2>
      <button   
      onClick={onAddChapter}
      className="py-2 md:py-2.5 px-3 md:px-5 me-2 mb-2
  text-sm font-medium text-gray-900 focus:outline-none
   bg-white rounded-full border border-gray-200 
   hover:bg-gray-100 hover:text-blue-700 focus:z-10 
   focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700
    dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
     dark:hover:text-white dark:hover:bg-gray-700 flex gap-2 items-center justify-center"><IoMdAdd size={24}/> <p>Add Chapter</p></button>

    </div>

    {isAdd?<div className="flex w-full justify-center gap-1">
      
      <div className="w-8/12">
      <Input
      
      id="title"
      label="Add Chapter Title"
      required
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
 
export default CreateChapter;