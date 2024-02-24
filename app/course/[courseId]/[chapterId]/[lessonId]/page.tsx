import { getLessonById } from "@/actions/getLessonById";

interface IParams{
  lessonId: string
}
const LessonPage = async({params}:{params:IParams}) => {

  const lesson=await getLessonById('65d8fffe01b63e703e31e17a');
  console.log("lesson:-",lesson)

  if(!lesson){
    return <div className="">No lesson </div>
  }

  return ( <div className="">
    <h1>lesson id {params.lessonId}</h1>
  </div> );
}
 
export default LessonPage;