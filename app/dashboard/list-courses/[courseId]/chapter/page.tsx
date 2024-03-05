


import { GetCourseById } from "@/actions/courses/getCourseById";
import ChapterList from "./chapterList";

import CreateChapter from "./create";
import Spinning from "@/components/spinning";

interface IParams{
  courseId: string;
}

const Chapter = async({params}:{params:IParams}) => {

  const course= await GetCourseById(params.courseId);
 


 if(!course){
  <div className="flex h-screen w-full justify-center items-center">
    <Spinning/>
  </div>

 }


  return ( <div className="py-10 flex bg-white dark:bg-gray-800 flex-col gap-10 min-h-screen w-full">



<div className="w-full flex justify-center py-4">
        <h1 className="text-xl dark:text-white font-bold">{course?.subject}</h1>
      </div>



    <CreateChapter courseId={params.courseId}/>



   {/* chapter lists */}
   <div className="mt-10">
  <ChapterList course={course}/>
   </div>
  </div> );
}
 
export default Chapter;

