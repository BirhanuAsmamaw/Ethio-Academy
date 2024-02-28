"use client"
import Input from "@/components/input/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosSend } from "react-icons/io";
import ChapterList from "./chapterList";
import { useEffect, useState } from "react";
import { CourseType } from "@/types";

interface IParams{
  courseId: string;
}

const Chapter = ({params}:{params:IParams}) => {
 const [isLoading,setLoading]=useState(false)
  const router=useRouter();
const {register,handleSubmit,reset,formState:{errors}}=useForm<FieldValues>({
  defaultValues:{
    title:"",
    courseId:params.courseId,
  }
  
});


const [course,setCourse]=useState<CourseType|any>(null)


  useEffect(()=>{
    async function fetchData() {
      try{
        const response=await axios.get(`/api/course/${params.courseId}`)
        setCourse(response.data);
      }

      catch(error){

      }
    }
    fetchData();
    
  },[params.courseId])




  const onSubmit:SubmitHandler<FieldValues>=(data)=>{
    setLoading(true);
    axios.post('/api/chapter',data).then(()=>{
      toast.success("Review  created  successfully")
      router.refresh()
      reset();
    }).catch((errors)=>{
      toast.error("something went wrong");
    }).finally(()=>{
      setLoading(false);
    });
   
  
  }
  return ( <div className="pt-10 flex bg-white dark:bg-gray-800 flex-col gap-10 min-h-screen w-full">



<div className="w-full flex justify-center py-4">
        <h1 className="text-xl font-bold">{course?.subject}</h1>
      </div>


      
    <div className="flex flex-col w-full justify-center gap-1">
      
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
   </div>







   {/* chapter lists */}
   <div className="mt-10">
  <ChapterList course={course}/>
   </div>
  </div> );
}
 
export default Chapter;

