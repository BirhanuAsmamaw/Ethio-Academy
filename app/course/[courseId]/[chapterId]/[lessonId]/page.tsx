
import Navbar from "@/components/navbar/Navbar";
import LessonClient from "./LessonClient";


interface IParams{
  lessonId: string
}
const LessonPage = ({params}:{params:IParams}) => {
return (<>
  <Navbar/>
 <LessonClient lessonId={params.lessonId}/>
</> );
}
 
export default LessonPage;