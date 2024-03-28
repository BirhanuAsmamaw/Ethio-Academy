"use client"

import { RemoveFile } from "@/actions/file/removeFile";
import DeleteComponent from "@/components/deleteComponent";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface DeleteCourseClientProps{
  course: any;
}
const DeleteCourseClient:React.FC<DeleteCourseClientProps> = ({course}) => {
  const router=useRouter();
  const [isLoading,setLoading]=useState(false);
  const onDelete=()=>{
    setLoading(true);
 axios.delete(`/api/course/${course.id}/deletecourse/contents`).then(async()=>{
  
  if(course.cover){
    await RemoveFile(course.cover.public_key);
  }

  if(course.videoThumbnail){
    await RemoveFile(course.videoThumbnail.public_key);
  }


  if(course.videoUrl){
    await RemoveFile(course.videoUrl.public_key);
  }
      toast.success(`Course deleted successfully`);
      router.push(`/dashboard/list-courses`);
      router.refresh();
    }).catch((error)=>{
      toast.error(error.message);
    }).finally(()=>{
      setLoading(false);
    });

  }
  return (<DeleteComponent isLoading={isLoading} onDelete={onDelete} title={`${course.subject} Course`} />);
}
 
export default DeleteCourseClient;