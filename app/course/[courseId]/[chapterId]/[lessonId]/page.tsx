import { getLessonById } from "@/actions/getLessonById";
import LessonClient from "./lessonClient";

interface IParams{
  lessonId: string
}
const LessonPage = async({params}:{params:IParams}) => {

  const lesson=await getLessonById('65d8fffe01b63e703e31e17a');
  

  if(!lesson){
    return <div className="">No lesson </div>
  }

  return ( <div className="">
    <LessonClient lesson={lesson}/>
  </div> );
}
 
export default LessonPage;