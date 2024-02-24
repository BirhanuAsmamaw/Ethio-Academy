import { getLessonById } from "@/actions/getLessonById";

import CourseSceleton from "../courseSceleton";
import Navbar from "@/components/navbar/Navbar";
import CourseContent from "../../courseContent";
import Container from "@/components/container/container";


interface IParams{
  lessonId: string
}
const LessonPage = async({params}:{params:IParams}) => {

  const lesson=await getLessonById(params.lessonId);
  
console.log("lessons data",lesson);
  if(!lesson){
    return <div className=""><CourseSceleton/> </div>
  }

  return (<>
  <Navbar/>
  <div className="flex flex-col lg:flex-row gap-10 justify-center py-10 px-2">

<div className="px-2 w-full md:w-10/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 flex flex-col gap-10  pt-10 
border-x-[1.5px]
bg-white 
dark:bg-gray-800
dark:border-gray-700
 border-gray-200">
   <h1 className="text-lg md:xl lg:2xl font-medium md:font-semibold lg:font-bold">{lesson.title}</h1>
   <div>
    <video
        className="w-full rounded-lg shadow-lg"
        controls
        poster={lesson.videoThumbnail || ''}
      >
        <source src={lesson.videoUrl || ''} type="video/mp4"  />
        Your browser does not support the video tag.
      </video></div>


      <div className="p-4">
      <div className="" dangerouslySetInnerHTML={{ __html: lesson.content}}></div>
      </div>
    
  </div>
  {/* course contents lits for above md */}
{lesson.chapter&&<div className="lg:fixed w-full lg:w-72 right-20 flex lg:h-screen items-center justify-center  ">
<Container childern={
  <div className="p-2 w-full">
    <CourseContent course={lesson.chapter.course}/>
  </div>
}/>

</div>}

  
  </div></> );
}
 
export default LessonPage;