

import { getLessonById } from "@/actions/lessons/getLessonById";
import LessonClientPage from "./lessonClientPage";



interface IParams{
  lessonId: string
}
const LessonPage = async({params}:{params:IParams}) => {

  const lesson=await getLessonById(params.lessonId);

 return(<LessonClientPage lesson={lesson}/>
 );
}
 
export default LessonPage;