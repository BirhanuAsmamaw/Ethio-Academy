interface IParams{
  lessonId: string
}
const LessonPage = ({params}:{params:IParams}) => {
  return ( <div className="">
    <h1>Lesson Id :{params.lessonId}</h1>
  </div> );
}
 
export default LessonPage;