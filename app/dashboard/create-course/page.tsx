import { getAllDepartments } from "@/actions/departments/getAllDepartments";
import CreateCourseClient from "./createCourseClient";

const CreateCourse = async() => {
  const departments=await getAllDepartments();
  return (  <CreateCourseClient departments={departments}/>);
}
 
export default CreateCourse;