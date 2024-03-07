
interface LessonClientProps{
  lesson:any;
}
const LessonClient:React.FC<LessonClientProps> = ({lesson}) => {
  return ( <div className="flex flex-col   gap-20">
  

<div className="">
      <div className="" dangerouslySetInnerHTML={{ __html: lesson.content}}></div>
      </div>

  </div> );
}
 
export default LessonClient;