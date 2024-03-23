


import { GetCourseById } from "@/actions/courses/getCourseById";


import CreateChapter from "./create";
import Spinning from "@/components/spinning";
import { ChapterList } from "./chapterList";

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


  return ( <div className="flex  min-h-screen items-center justify-center w-full  p-4 lg:p-10">
  <div className="w-full lg:px-10  xl:px-20 2xl:px-32 bg-white dark:bg-slate-800 p-2 flex flex-col gap-2">
    
  <CreateChapter courseId={params.courseId}/>
    <ChapterList course={course}/>
  </div>

  </div> );
}
 
export default Chapter;

