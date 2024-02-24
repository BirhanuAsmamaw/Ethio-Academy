import { getLessonById } from "@/actions/getLessonById";
import LessonClient from "./lessonClient";
import CourseSceleton from "../courseSceleton";
import Navbar from "@/components/navbar/Navbar";

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
   <div className="flex flex-col gap-10 py-10 ">
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
  </div></> );
}
 
export default LessonPage;