
import CreateCourseClient from "./createCourseClient";
import { getAllSubject } from "@/actions/subject/getAllSubject";

const CreateCourse = async() => {
  const subjects=await  getAllSubject()
  return (  <CreateCourseClient subjects={subjects}/>);
}
 
export default CreateCourse;