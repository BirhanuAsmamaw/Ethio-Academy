
import Navbar from "@/components/navbar/Navbar";
import LessonClient from "./LessonClient";


interface IParams{
  lessonId: string
}
const LessonPage = ({params}:{params:IParams}) => {

 
  
 


  return (<>
  <Navbar/>
 <div className=" min-h-screen flex justify-center items-center w-full">
 <LessonClient lessonId={params.lessonId}/>
 </div>
 
</> );
}
 
export default LessonPage;