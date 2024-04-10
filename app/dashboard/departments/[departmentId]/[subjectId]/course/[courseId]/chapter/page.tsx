


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
  <div className="w-full p-4 md:p-10 xl:w-8/12 bg-white dark:bg-slate-800  flex flex-col gap-2">
    
  <CreateChapter course={course}/>
    <ChapterList course={course}/>
  </div>

  </div> );
}
 
export default Chapter;

