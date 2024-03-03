"use client"

import DeleteComponent from "@/components/deleteComponent";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface IParams{
  courseId: string;
}
const DeleteCourse = ({params}:{params:IParams}) => {
  const router=useRouter();
  const [isLoading,setLoading]=useState(false);
  const onDelete=()=>{
    setLoading(true);
    axios.delete(`/api/course/${params.courseId}/delete`).then(()=>{
      toast.success(`Course deleted successfully`);
      router.push(`/dashboard/list-courses`);
      router.refresh();
    }).catch((error)=>{
      toast.error(error.message);
    }).finally(()=>{
      setLoading(false);
    });

  }
  return (<DeleteComponent isLoading={isLoading} onDelete={onDelete} title="Delete this Course" label="Delete" />);
}
 
export default DeleteCourse;