import { getLessonById } from "@/actions/getLessonById";
import LessonClient from "./lessonClient";
import CourseSceleton from "../courseSceleton";
import Navbar from "@/components/navbar/Navbar";
import CourseContent from "../../courseContent";

interface IParams{
  lessonId: string
}
const LessonPage = async({params}:{params:IParams}) => {

  const lesson=await getLessonById(params.lessonId);
  

  if(!lesson){
    return <div className=""><CourseSceleton/> </div>
  }

  return (<>
  <Navbar/>
  <div className="flex justify-center py-10 px-2">

<div className="w-full md:w-10/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 flex flex-col gap-10  pt-10">
   <h1 className="text-lg font-medium">{lesson.title}</h1>
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
{lesson.chapter&&<div className="lg:fixed right-20 flex lg:h-screen items-center justify-center  ">
<CourseContent course={lesson.chapter.course}/>

</div>}

  
  </div></> );
}
 
export default LessonPage;