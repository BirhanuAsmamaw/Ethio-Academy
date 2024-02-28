interface QuestionsClientProps{
  lesson:any;
}


const QuestionsClient:React.FC<QuestionsClientProps> = ({lesson}) => {
  return (  <div className={`bg-white dark:bg-gray-800 py-10 min-h-screen flex flex-col items-center gap-6 w-full`}>
  
     <div className="py-4">
      <h5>Write Questions of <span className="text-green-600 dark:text-green-400">{lesson.title}</span> in <span className="text-rose-600 dark:text-rose-400">{lesson.chapter.title} </span>of <span className="text-blue-600 dark:text-blue-400">{lesson.chapter.course.subject}</span></h5>
     </div>


  
  </div>);
}
 
export default QuestionsClient;