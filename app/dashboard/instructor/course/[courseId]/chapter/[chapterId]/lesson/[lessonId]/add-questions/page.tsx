import { getLessonById } from "@/actions/lessons/getLessonById";
import QuestionsClient from "./QuestionsClient";


const AddQuestions = async({params}:{params:{lessonId:string}}) => {

const lesson=await getLessonById(params.lessonId);

  return ( <div className=" mt-16 lg:mt-0 flex justify-center p-2 items-center w-full  min-h-screen">
    <QuestionsClient lesson={lesson}/>

  </div>);
}
 
export default AddQuestions;