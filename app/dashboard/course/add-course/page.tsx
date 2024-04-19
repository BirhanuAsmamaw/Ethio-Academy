
import { getSubjectById } from "@/actions/subject/getSubjectById";
import CreateCourseClient from "./createCourseClient";
import { getAllDepartments } from "@/actions/departments/getAllDepartments";


const CreateCourse = async() => {
  const departments=await  getAllDepartments();

 
  return (  <CreateCourseClient departments={departments}/>);
}
 
export default CreateCourse;