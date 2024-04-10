import { GetCourseById } from "@/actions/courses/getCourseById";
import DeleteCourseClient from "./deleteCourseClient";

interface IParams{
  courseId: string;
}
const DeleteCourse = async({params}:{params:IParams}) => {
  const course=await GetCourseById(params.courseId);
  return (<DeleteCourseClient course={course}/>);
}
 
export default DeleteCourse;