import { GetCourseById } from "@/actions/courses/getCourseById";
import EditCourseClient from "./editCourseClient";

interface IParams{
  courseId: string;
}

const EditCourse = async({params}:{params:IParams}) => {

  const course=await GetCourseById(params.courseId);
  return (<EditCourseClient course={course}/> );
}
 
export default EditCourse;
