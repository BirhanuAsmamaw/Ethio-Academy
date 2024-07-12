
"use client"

import { GetCourseById } from "@/actions/courses/getCourseById";
import CreateChapter from "./create";
import Spinning from "@/components/spinning";
import { ChapterList } from "./chapterList";
import { getCurrentUser } from "@/actions/users/currentUser";
import { useCourseDetailQuery } from "@/redux/features/course/courseApi";
import { useMyPermissionQuery } from "@/redux/features/permission/permissionApi";
import { useRouter } from "next/navigation";

interface IParams{
  courseId: string;
  departmentId: string;
  subjectId: string;
}

const Chapter = ({params}:{params:IParams}) => {

  const router=useRouter();

  const {data:course,isSuccess:courseSucc,isLoading:courseLoad}=useCourseDetailQuery(params?.courseId)


const {data:permissions,isSuccess:permSucc,isLoading:permLoad}=useMyPermissionQuery();
 const isDataAccessed=permSucc&&permissions?.some((permission)=>permission?.action === "CanManageCourse" || permission?.action === "CanCreateCourse");

 if((!isDataAccessed)&&permSucc){
  router.back();
 }
 

 if(courseLoad || permLoad){
  <div className="flex h-screen w-full justify-center items-center">
    <Spinning/>
  </div>

 }


  return ( <div className="flex  min-h-screen items-center justify-center w-full  p-4 lg:p-10">
  <div className="w-full p-4 md:p-10 xl:w-8/12 rounded-md bg-white dark:bg-slate-800  flex flex-col gap-2">
    
  <CreateChapter course={courseSucc&&course} />
    <ChapterList course={courseSucc&&course}/>
  </div>

  </div> );
}
 
export default Chapter;

