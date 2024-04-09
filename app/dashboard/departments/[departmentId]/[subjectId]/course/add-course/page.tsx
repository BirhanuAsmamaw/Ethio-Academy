
import { getSubjectById } from "@/actions/subject/getSubjectById";
import CreateCourseClient from "./createCourseClient";


const CreateCourse = async({params}:{params:{subjectId:string}}) => {
  const subject=await  getSubjectById(params.subjectId);
  return (  <CreateCourseClient subject={subject}/>);
}
 
export default CreateCourse;