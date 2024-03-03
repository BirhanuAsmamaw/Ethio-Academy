"use client"

import { DeleteCourseById } from "@/actions/courses/deleteCoureById";
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
  const onDelete = async () => {
    setLoading(true);
    try {
      await DeleteCourseById(params.courseId);
      toast.success(`Course deleted successfully`);
      router.push(`/dashboard/list-courses`);
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (<DeleteComponent isLoading={isLoading} onDelete={onDelete} title="Delete this Course" label="Delete" />);
}
 
export default DeleteCourse;