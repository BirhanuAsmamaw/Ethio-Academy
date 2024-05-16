"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuizClient from "./lessonQuestionClient";
import { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CodeHighlighterComponent from "@/components/codeHighlighter";


interface LessonClientProps{
  lesson:any;
}
const LessonClient:React.FC<LessonClientProps> = ({lesson}) => {
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [showQuiz,setShowQuiz] = useState(false);
  const router=useRouter();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  
  return ( <Tabs defaultValue="notes" className="w-full">
  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-4">
    <TabsTrigger className="
           border-b-[1.5px]  
           font-normal
            border-slate-400 
           bg-transparent 
           shadow-none
           hover:dark:text-white
           hover:text-gray-900
           hover:font-medium
           hover:dark:border-gray-100
            transition
              duration-300
           hover:border-gray-800
           data-[state=active]:border-blue-500
           data-[state=active]:dark:border-green-400
           data-[state=active]:border-b-2
           data-[state=active]:font-medium
           data-[state=active]:text-blue-500
           data-[state=active]:dark:text-green-400

           " value="notes">Notes</TabsTrigger>
    <TabsTrigger  className="
           border-b-[1.5px]  
           font-normal
            border-slate-400 
           bg-transparent 
           shadow-none
           hover:dark:text-white
           hover:text-gray-900
           hover:font-medium
           hover:dark:border-gray-100
            transition
              duration-300
           hover:border-gray-800
           data-[state=active]:border-blue-500
           data-[state=active]:dark:border-green-400
           data-[state=active]:border-b-2
           data-[state=active]:font-medium
           data-[state=active]:text-blue-500
           data-[state=active]:dark:text-green-400

           " value="exam">
    <Dialog >
  <DialogTrigger className="w-full h-full">
  Exam
  </DialogTrigger>
  <DialogContent className="bg-white dark:bg-gray-700 rounded-[10px]" >
  <div className="p-10 flex flex-col gap-4">
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
    </TabsTrigger>
    <TabsTrigger  className=" rounded-full hidden" value="handout">handout</TabsTrigger>
    <TabsTrigger  className=" rounded-full hidden" value="Q&A">Q&A</TabsTrigger>
  </TabsList>

  <TabsContent value="notes">
 <div className=" p-2 md:p-4">
 <div className="flex flex-col   gap-20">
  

{lesson?.contents?.length?<div className="w-full space-y-2">
  {
     lesson?.contents?.map((content:any)=>{
return <div key={content?.id}  className="w-full space-y-10">

  {content?.content?<div className="w-full" dangerouslySetInnerHTML={{ __html: content.content}}></div>:""}

  {content?.codeExample?<div className="flex w-full justify-center">
  <CodeHighlighterComponent codeString={content?.codeExample.code} language={content?.codeExample.language}/>
  </div>:""}
  
 {content?.image? <div className="w-full flex justify-center">
    <Image height={400} width={500} src={content?.image.public_url} alt="content image"/>
  </div>:""}

</div>
     })
  }
      
      </div>:<div>No Contents</div>}

  </div> 
 </div>
  </TabsContent>



  <TabsContent value="exam">
  <div className="">
  <QuizClient lesson={lesson} feedbackVisible={feedbackVisible} showQuiz={showQuiz} setFeedbackVisible={()=>setFeedbackVisible(true)}/>
  </div>
  </TabsContent>

  <TabsContent className="hidden" value="handout">
  <div className="">
  <p className="text-2xl font-bold p-2">handouts  like pdf ppt</p>
  </div>
  </TabsContent>

  <TabsContent className="hidden" value="Q&A">
  <div className="">
  <p>Question and Answers</p>
  </div>
  </TabsContent>
</Tabs>);
}
 
export default LessonClient;