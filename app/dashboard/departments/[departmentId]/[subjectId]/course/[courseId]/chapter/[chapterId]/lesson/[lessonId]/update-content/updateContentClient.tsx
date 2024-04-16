"use client"

import Input from "@/components/input/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { FieldValues, SubmitHandler,  useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ContentList from "../contentList";
import CreateContent from "../createContent";
import { IoIosSend } from "react-icons/io";


interface UpdateLessonContentClientProps{
  lesson:any
}
const UpdateLessonContentClient:React.FC<UpdateLessonContentClientProps> = ({lesson}) => {


  const [isLoading,setLoading]=useState(false);
  


const router=useRouter();
  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues:{
      title:lesson.title,
     
    }
  })

 












  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setLoading(true)
    


 
    axios.put(`/api/lesson/${lesson.id}/update/content`,data).then(()=>{
      toast.success("Lesson Updated  successfully")
      router.push(`/dashboard/departments/${lesson?.chapter.course.subject.department.id}/${lesson?.chapter.course.subject.id}/course/${lesson?.chapter.course.id}/chapter/${lesson?.chapter.id}/lesson/${lesson?.id}/update-content`)
      router.refresh();
    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setLoading(false)
    });

  }







  return ( <><div className={` flex flex-col items-center gap-6 w-full  transition duration-300`}>

<div className="space-y-2 w-full flex flex-col items-center">
      <h2 className="text-lg text-gray-600 dark:text-gray-400 font-semibold">{lesson.chapter.title} in {lesson?.chapter.course?.course}</h2>
    <h1 className="text-xl font-semibold">{lesson?.title} Contents</h1>
    </div>

    <div className="flex w-full justify-center gap-1">
      
      <div className="w-8/12">
      <Input
      
      id="title"
      label="Update Lesson Title"
      required
      register={register}
      errors={errors}
      disabled={isLoading}
      type="text"
      />
      </div>
       <div className="flex pt-4 justify-center  items-center">
      <button onClick={handleSubmit(onSubmit)} 
      className="
      text-gray-500
       dark:text-gray-400 
       font-bold
        hover:text-blue-500
        hover:dark:text-blue-400 
        transition  
      duration-300">
        <IoIosSend size={40}/>
        </button>
       </div>
      </div>

         
         <ContentList lesson={lesson}/>
    <CreateContent lesson={lesson}/>



         

</div>

          




   </>);
}
 
export default UpdateLessonContentClient;