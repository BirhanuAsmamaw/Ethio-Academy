import { getLessonById } from "@/actions/lessons/getLessonById";
import QuestionsClient from "./QuestionsClient";


const AddQuestions = async({params}:{params:{lessonId:string}}) => {

const lesson=await getLessonById(params.lessonId);

  return (<QuestionsClient lesson={lesson}/>);
}
 
export default AddQuestions;