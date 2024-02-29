"use client"
import {
  Dialog,
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

import { useRouter } from "next/navigation";

interface QuizClientProps{
  lesson:any;
}
const QuizClient:React.FC<QuizClientProps> = ({lesson}) => {
  const router=useRouter();
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [isSelectedAll,setSelectedAll]=useState(false);
  const [score, setScore] = useState(0);
  const [showQuiz,setShowQuiz] = useState(false);
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
 
  {showQuiz?<div className="pt-10" id="quiz">
    <div className="p-2 py-10">
      <h4 className="text-lg font-bold border-b-2 border-dashed">Quizzes of Indroduction of Biology</h4>
    </div>
      {
        lesson.questions.map((question:any,index:number)=>{
        return <div key={index} className="">

<div className="flex border-b border-double border-green-600 justify-between">
        <p className="text-xl font-bold">{index+1}</p>
        <p className="text-gray-500  dark:text-gray-400 text-sm">{question.year}</p>
      </div>
      <p className="p-2">{question.title}</p>
      <div className="p-2 space-y-2">
        {
          question.chooses.map((choice:any,ind:number) =>{
            return <div key={ind}   
            className={`flex gap-2 p-2 ${
              (feedbackVisible&&selectedChoices[index+1]&& choice.isAnswer)&&'dark:bg-green-400  bg-green-200'||isSelectedAll&& choice.isAnswer&&'dark:bg-green-400  bg-green-200'
            } ${
              selectedChoices[(index+1)]?.choiceIndex === ind.toString() &&feedbackVisible&&
              selectedChoices[(index+1)]?.isCorrect
                ? 'dark:bg-green-400 bg-green-200'
                : feedbackVisible&&selectedChoices[(index+1)]?.choiceIndex === ind.toString()
                ? 'dark:bg-red-400 bg-red-200'
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
    className={`h-4 w-4 disabled:cursor-not-allowed disabled:outline-blue-400 disabled:dark:outline-blue-500 outline outline-2 border-2  dark:border-gray-700 border-white dark:outline-blue-600 outline-blue-500 rounded-full  ${
      selectedChoices[index+1]?.choiceIndex === ind.toString()
        ? 'bg-blue-400 dark:bg-blue-600 disabled:dark:bg-blue-400 disabled:bg-blue-300'
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
          <div className="p-2 bg-green-50 bg-gray-700">
            <p>{question.explanation}</p>
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
       className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-[10px] text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit
       </button></DialogTrigger>
       <DialogContent className="bg-white dark:bg-gray-700 rounded-[10px]" >
        <div className="flex justify-center w-full">
        <div className="w-48 h-48 flex justify-center items-center rounded-full border-2">
          <p className="text-2xl font-bold">{score}/{lesson.questions.length}</p>
        </div>
        </div>
       </DialogContent>
     </Dialog>


      </div></div>:
      <div className="flex justify-center w-full p-10">
      
<Dialog>
  <DialogTrigger>
  <div 
  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-[10px] text-sm px-5 py-2.5 text-center me-2 mb-2">
   Start Quizzess</div>
  </DialogTrigger>
  <DialogContent className="bg-white dark:bg-gray-700 rounded-[10px]" >
  <div className="p-10 flex flex-col gap-4">
        <button
          onClick={()=>{
            setFeedbackVisible(true);
            setShowQuiz(true);
            router.push(`/course/${lesson.chapter.course.id}/${lesson.chapter.id}/${lesson.id}#quiz`);
         }}
          className="text-white bg-green-500 px-4 py-2 rounded-[5px] mr-2 hover:bg-green-600 focus:outline-none"
        >
          Check Right Answer Now!
        </button>
        <button
          onClick={()=>{
            setFeedbackVisible(false);
            setShowQuiz(true);
            router.push(`/course/${lesson.chapter.course.id}/${lesson.chapter.id}/${lesson.id}#quiz`);
          }}
          className="text-white bg-blue-500 px-4 py-2 rounded-[5px] hover:bg-blue-600 focus:outline-none"
        >
          Show Answers After Quiz
        </button>
      </div>
  </DialogContent>
</Dialog>
      </div>
      }
      
  </> );
}
 
export default QuizClient;