

import { getLessonById } from "@/actions/lessons/getLessonById";
import LessonClientPage from "./lessonClientPage";
import CourseSceleton from "../courseSceleton";


interface IParams{
  lessonId: string
}
const LessonPage = async({params}:{params:IParams}) => {

  const lesson=await getLessonById(params.lessonId);

  if(!lesson){
    return <div className=""><CourseSceleton/> </div>
  }
 return(<LessonClientPage lesson={lesson}/>
 );
}
 
export default LessonPage;