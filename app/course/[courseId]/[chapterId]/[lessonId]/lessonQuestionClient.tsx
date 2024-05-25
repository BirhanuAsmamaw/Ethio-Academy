"use client"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { useState } from "react";
import CodeHighlighterComponent from "@/components/codeHighlighter";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/moving-border";


interface QuizClientProps{
  lesson:any;
}
const QuizClient:React.FC<QuizClientProps> = ({lesson}) => {
 
  const [isSelectedAll,setSelectedAll]=useState(false);
  const [score, setScore] = useState(0);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [showQuiz,setShowQuiz] = useState(false);
  const router=useRouter();
 
const [selectedChoices, setSelectedChoices] = useState<any>({});

const onSelectionChanged = (questionId:number, choiceIndex:string, isAnswer:boolean) => {
  const updatedChoices = {
    ...selectedChoices,
    [questionId]: {
      choiceIndex,
      isCorrect: isAnswer,
    },
  };
  setSelectedChoices(updatedChoices);
 
  

  // Calculate score
  const newScore = Object.values(updatedChoices).reduce(
    (acc:number, choice:any) => (choice.isCorrect ? acc + 1 : acc),
    0
  );
  setScore(newScore);
};

const onSubmit=()=>{
  setFeedbackVisible(true);
  setSelectedAll(true);
}

  return ( <>
 
  {showQuiz?<div className="py-10 " id="quiz">
    <div className="p-2 ">
      <h4 className="text-lg font-bold border-b p-1">Quizzes of {lesson.title}</h4>
    </div>
      {
        lesson.questions.map((question:any,index:number)=>{
        return <div key={index} className="py-2">

<div className="flex border-b-2 border-double dark:border-gray-600 justify-between">
        <p className="text-xl font-bold">{index+1}</p>
        {question?.year?<p className="text-gray-500  dark:text-gray-400 text-sm">{question?.year}</p>:""}
      </div>
      <div className="p-2 pb-4" dangerouslySetInnerHTML={{__html:question?.title}}></div>
      {question?.code?<CodeHighlighterComponent language={question?.code?.langauge} codeString={question?.code?.code}/>:""}
      <div className="p-2 space-y-2">
        {
          question.chooses.map((choice:any,ind:number) =>{
            return <div key={ind}   
            className={`flex gap-2 p-2 ${
              (feedbackVisible&&selectedChoices[index+1]&& choice.isAnswer)&&'dark:bg-green-700  bg-green-200'||isSelectedAll&& choice.isAnswer&&'dark:bg-green-700  bg-green-200'
            } ${
              selectedChoices[(index+1)]?.choiceIndex === ind.toString() &&feedbackVisible&&
              selectedChoices[(index+1)]?.isCorrect
                ? 'dark:bg-green-700 bg-green-200'
                : feedbackVisible&&selectedChoices[(index+1)]?.choiceIndex === ind.toString()
                ? 'dark:bg-red-700 bg-red-200'
                : ''
            }`}>
             <button
             disabled={(selectedChoices[index+1]&&feedbackVisible)||isSelectedAll}
    onClick={() => {
      onSelectionChanged(
       index+1,
        ind.toString(),
        choice.isAnswer
      );
    }}
    className={`h-4 w-4 disabled:cursor-not-allowed disabled:outline-blue-400 disabled:dark:outline-blue-600 outline outline-2 border-2  dark:border-gray-700 border-white dark:outline-blue-700 outline-blue-500 rounded-full  ${
      selectedChoices[index+1]?.choiceIndex === ind.toString()
        ? 'bg-blue-400 dark:bg-blue-800 disabled:dark:bg-blue-700 disabled:bg-blue-300'
        : 'bg-white dark:bg-gray-700'
    }`}
  >
    
  </button>
            <p>{choice.text}</p>
          </div>
          })
        }
       
      </div>
      {
  (selectedChoices[index+1] && feedbackVisible) || isSelectedAll ? (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="hover:no-underline"><p className="text-lg">Explanation</p></AccordionTrigger>
        <AccordionContent>
          <div className="p-2 bg-green-50 dark:bg-gray-700">
            <div dangerouslySetInnerHTML={{__html:question.explanation}}></div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ) : (
    ''
  )
}




        </div>
        })
      }


      <div className="flex justify-end p-4 ">
     
     <Dialog >
      <DialogTrigger> <button 
      onClick={onSubmit}
       className="text-white
        bg-blue-700 hover:bg-blue-800 focus:ring-4
         focus:ring-blue-300 font-medium rounded-[10px] text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit
       </button></DialogTrigger>
       <DialogContent className="bg-white dark:bg-gray-700 rounded-[10px]" >
        <div className="flex justify-center w-full">
        <div className="w-48 h-48 flex justify-center items-center rounded-full border-2">
          <p className="text-2xl font-bold">{score}/{lesson.questions.length}</p>
        </div>
        </div>
       </DialogContent>
     </Dialog>


      </div></div>:<div className="w-full h-[80vh] flex justify-center items-center">
      <Dialog >
  <DialogTrigger className="h-full">
 
  <Button
        borderRadius="1.75rem"
        className="bg-slate-100 dark:bg-slate-900 text-blue-600 text-[16px]
         font-medium dark:text-green-400 border-neutral-200 dark:border-slate-800"
      >
        Start Quiz Now!
      </Button>

  </DialogTrigger>
  <DialogContent className="bg-white dark:bg-gray-700 rounded-[10px]" >
  <div className="p-2 md:p-10 flex flex-col gap-4">
        <DialogClose><button
          onClick={()=>{
            setFeedbackVisible(true);
            setShowQuiz(true);
            router.push(`/course/${lesson.chapter.course.id}/${lesson.chapter.id}/${lesson.id}#quiz`);
            router.refresh();
            
         }}
          className="text-white bg-green-500 px-4 py-2 rounded-[5px] mr-2 hover:bg-green-600 focus:outline-none"
        >
          Check Right Answer Now!
        </button></DialogClose>
       <DialogClose> <button
          onClick={()=>{
            setFeedbackVisible(false);
            setShowQuiz(true);
            router.push(`/course/${lesson.chapter.course.id}/${lesson.chapter.id}/${lesson.id}#quiz`);
            router.refresh();
          }}
          className="text-white bg-blue-500 px-4 py-2 rounded-[5px] hover:bg-blue-600 focus:outline-none"
        >
          Show Answers After Quiz
        </button></DialogClose>
      </div>
  </DialogContent>
</Dialog>

</div>  
      }
      
  </> );
}
 
export default QuizClient;