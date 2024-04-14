"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuizClient from "./lessonQuestionClient";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";


interface LessonClientProps{
  lesson:any;
}
const LessonClient:React.FC<LessonClientProps> = ({lesson}) => {
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [showQuiz,setShowQuiz] = useState(false);
  const router=useRouter();
  return ( <Tabs defaultValue="notes" className="w-full">
  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-4">
    <TabsTrigger className=" rounded-full" value="notes">Notes</TabsTrigger>
    <TabsTrigger  className=" rounded-full" value="exam">
    <Dialog>
  <DialogTrigger className="w-full">
  Exam
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
    </TabsTrigger>
    <TabsTrigger  className=" rounded-full hidden" value="handout">handout</TabsTrigger>
    <TabsTrigger  className=" rounded-full hidden" value="Q&A">Q&A</TabsTrigger>
  </TabsList>

  <TabsContent value="notes">
 <div className="mt-20">
 <div className="flex flex-col   gap-20">
  

<div className="">
      <div className="" dangerouslySetInnerHTML={{ __html: lesson.content}}></div>
      </div>

  </div> 
 </div>
  </TabsContent>



  <TabsContent value="exam">
  <div className="mt-20">
  <QuizClient lesson={lesson} feedbackVisible={feedbackVisible} showQuiz={showQuiz} setFeedbackVisible={()=>setFeedbackVisible(true)}/>
  </div>
  </TabsContent>

  <TabsContent className="hidden" value="handout">
  <div className="mt-20">
  <p className="text-2xl font-bold p-2">handouts  like pdf ppt</p>
  </div>
  </TabsContent>

  <TabsContent className="hidden" value="Q&A">
  <div className="mt-20">
  <p>Question and Answers</p>
  </div>
  </TabsContent>
</Tabs>);
}
 
export default LessonClient;