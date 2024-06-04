
import Navbar from "@/components/navbar/Navbar";
import CourseClientPage from "./courseClientPage";


interface IPrams{
  courseId:string;
}


const CoursePage = ({params}:{params:IPrams}) => {
  
return ( <>
  <Navbar/>
 

<CourseClientPage courseId={params?.courseId} />
 </>);
}
 
export default CoursePage;
















