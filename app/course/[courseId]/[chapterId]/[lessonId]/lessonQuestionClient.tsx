"use client"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CourseSceleton from "../courseSceleton";







interface LessonQuestionClientProps{
  lesson: any;
}

const LessonQuestionClient:React.FC<LessonQuestionClientProps> = ({lesson}) => {
const router=useRouter();


  


const choice1 = useRef<HTMLLIElement>(document.createElement('li'));
  const choice2 = useRef<HTMLLIElement>(document.createElement('li'));
  const choice3 = useRef<HTMLLIElement>(document.createElement('li'));
  const choice4 = useRef<HTMLLIElement>(document.createElement('li'));
  const choice_array=[choice1, choice2, choice3, choice4]
 

  
  const [score, setScore] = useState(0);
  const [indexQuestion ,setIndexQuestion] = useState(0);
  const [question, setQuestion] = useState(lesson.questions[indexQuestion]);
  const [disabled, setDisabled] = useState(false);
  const[showSubmit, setShowSubmit] = useState(false);









  const handleOptionClick = (e:any,ans:number,index:number) => {
   const isCorrect=e.target.value==ans;
   setDisabled(e.target.checked)
   if (isCorrect){
    e.target.parentElement.classList.add("bg-teal-200");
    e.target.parentElement.classList.add("dark:bg-teal-600");
    setScore((prev)=>prev+1)
    

   }else{
    if (choice_array[ans]?.current) {
      choice_array[ans].current.classList.add("bg-teal-200");
      choice_array[ans].current.classList.add("dark:bg-teal-600");
    }
    e.target.parentElement.classList.add("bg-rose-200");
    e.target.parentElement.classList.add("dark:bg-rose-600");

   }
   
  };

  


  const onNextChangeQuestion = ()=>{
    if(indexQuestion<lesson.questions.length-1){
      setIndexQuestion((prev)=>prev+=1)
      choice_array.map((option)=>{
        option.current.classList.remove("bg-teal-200");
        option.current.classList.remove("dark:bg-teal-600");
        option.current.classList.remove("bg-rose-200");
        option.current.classList.remove("dark:bg-rose-600");
      })
      setDisabled(false);
     
      
    }
    else{
      setShowSubmit(true);
        
    }
   
    
  }
  const onPrevChangeQuestion  = ()=>{
    if(indexQuestion>0){
      setIndexQuestion((prev)=>prev-=1)
      
     
      
    }
   
    
  }
  
  useEffect(() => { setQuestion(lesson.questions[indexQuestion])},[lesson.questions,indexQuestion]);
  // useEffect(() => {
  //   const  lessonsData=lessons.filter((ls:any)=>ls.chapterId===params.chapterId)
  //   const lessonData=lessonsData.filter((ls:any)=>ls.lessonId===params.lessonId)
  //   setLesson(lessonData)
  //   setLessons(lessonsData)
  //  },[]);






  

const [currentLesson, setCurrentLesson] = useState(parseInt(lesson.id) || 1);

  const onPrevChange = () => {
    if (currentLesson > 1) {
      const newLessonId = currentLesson - 1;
      // router.push(`/course/${params.id}/${params.chapterId}/${newLessonId}`);
      

      setCurrentLesson(newLessonId);
    }
    else{
      // router.push(`/course/${params.id}/${params.chapterId}/${lessonsData.length}`);

    }
    router.refresh();
  };

  const onNextChange = () => {
    // You should check whether the next lesson exists based on your logic
    
    // if(currentLesson<lessonsData.length){
    //   const newLessonId = currentLesson + 1;
    // router.push(`/course/${params.id}/${params.chapterId}/${newLessonId}`);
    // setCurrentLesson(newLessonId);
    // }
    // else{
    //   router.push(`/course/${params.id}/${params.chapterId}/1`);
    // }
    
      router.refresh();
    
  };


const onsubmit = () => {
  alert("score:"+`${score}/${lesson.questions.length}`);
}



if(!lesson){
  return ( <div className="flex h-screen justify-center py-10 px-2">
    <div className="w-full md:w-10/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 flex flex-col gap-10  pt-10">
      <CourseSceleton/>
      </div> 

  </div>)
}









  return ( <div className="lg:p-4">
  <div className="flex flex-col lg:flex-row justify-between md:px-10 py-2">
  <h1 className="text-lg font-medium">{lesson.title} Quizzes</h1>
  <h2 className="text-sm">score:{score}</h2>
  <p className="text-slate-600">{indexQuestion+1} out of {lesson.questions.length}</p>
  </div>
  <hr className="h-[2px] w-full bg-slate-200"/>
  <div className="mt-4">
    <div className="flex gap-1 py-2 w-full">
     
        <div className="text-center w-6 h-6 text-lg font-semibold  bg-teal-200 dark:bg-gray-700 rounded-full ">{question.id}</div>
   
      <h2 className="text-lg">{question.question}</h2>
    </div>
    <ul>
      {question.choices.map((option:any, index:number) => (
        <li ref={choice_array[index]} key={index} className='flex gap-2 p-2'>
          <input disabled={disabled} type="radio" name="0" value={option.isAnswer} onChange={()=>handleOptionClick(event,question,index)}/>
          <label>{option.text}</label>
        </li>
      ))}
    </ul>
    <div className="mt-6 ">{

    disabled&&<Accordion type="single" collapsible className="border-none" >

<AccordionItem  value={`${question.id}`}className="border-none">
<AccordionTrigger ><div className="text-lg text-captalize">
<h5 className="text-lg">Explanation</h5>

</div></AccordionTrigger>
<AccordionContent className="bg-teal-100 dark:bg-gray-700  p-2">
<p>{question.explanation}</p>
</AccordionContent>
</AccordionItem>





</Accordion>

     } </div>
   <div className="flex justify-end px-10 mt-10"> 
    {showSubmit? <button className="dark:bg-gray-700 dark:hover:bg-gray-600 border-none bg-teal-300 hover:teal-400 rounded-[5px] px-2 py-1"  onClick={onsubmit}>
      submit
    </button>:<button className="dark:bg-gray-700 dark:hover:bg-gray-600 border-none bg-teal-300 hover:teal-400 rounded-[5px] px-2 py-1"  onClick={onNextChangeQuestion}>
      Next Question
    </button>}
    </div>
  </div>
</div> );
}
 
export default LessonQuestionClient;