import { getCourses } from "@/actions/getCourses";
import { CourseListClient } from "./courseListClient";

const ListCourses = async() => {

  const courses=await getCourses();
  return ( <div className="px-4 py-10">
    <CourseListClient courses={courses}/>
  </div> );
}
 
export default ListCourses;