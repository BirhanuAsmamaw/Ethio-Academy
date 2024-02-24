import { getLessonById } from "@/actions/getLessonById";

interface IParams{
  lessonId: string
}
const LessonPage = async({params}:{params:IParams}) => {

  const lesson=await getLessonById(params.lessonId);
  console.log("lesson:-",lesson)

  if(!lesson){
    return <div className="">No lesson </div>
  }

  return ( <div className="">
    <h1>lesson id {params.lessonId}</h1>
  </div> );
}
 
export default LessonPage;