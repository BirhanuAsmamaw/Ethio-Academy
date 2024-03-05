"use client"

import Input from "@/components/input/input";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosSend } from "react-icons/io";
interface CreateChapterProps{
  courseId:string;
}
const CreateChapter:React.FC<CreateChapterProps> = ({courseId}) => {
  const [isLoading,setLoading]=useState(false)
  const router=useRouter();
const {register,handleSubmit,reset,formState:{errors}}=useForm<FieldValues>({
  defaultValues:{
    title:"",
    courseId:courseId,
  }
  
});


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
  return ( <div className="flex w-full justify-center gap-1">
      
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
  </div> );
}
 
export default CreateChapter;