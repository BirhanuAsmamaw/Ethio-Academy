import { getLessonById } from "@/actions/getLessonById";
import LessonClient from "./lessonClient";

interface IParams{
  lessonId: string
}
const LessonPage = async({params}:{params:IParams}) => {

  const lesson=await getLessonById(params.lessonId);
  

  if(!lesson){
    return <div className="">No lesson </div>
  }

  return ( <div className="">
   <h1 className="text-lg font-medium">{lesson.title}</h1>
  </div> );
}
 
export default LessonPage;