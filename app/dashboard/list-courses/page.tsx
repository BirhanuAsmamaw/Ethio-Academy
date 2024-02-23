import { getCourses } from "@/actions/getCourses";
import { CourseListClient } from "./courseListClient";

const ListCourses = async() => {

  const courses=await getCourses();
  return ( <div className="">
    <CourseListClient courses={courses}/>
  </div> );
}
 
export default ListCourses;