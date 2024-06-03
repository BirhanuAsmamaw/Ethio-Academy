"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuizClient from "./lessonQuestionClient";
import { useEffect, useState } from "react";

import Image from "next/image";
import CodeHighlighterComponent from "@/components/codeHighlighter";
import { useCourseCertificateMutation, useCourseStreakMutation } from "@/redux/features/course/courseApi";
import { useUserStreakMutation } from "@/redux/features/user/userApi";


interface LessonClientProps{
  lesson:any;
}
const LessonClient:React.FC<LessonClientProps> = ({lesson}) => {
  



  // User Streak
  const [userStreak]=useUserStreakMutation();

  const [certificate, { data: cerData, error: cerErr }] = useCourseCertificateMutation();

  useEffect(() => {
    if (lesson?.id) {
      const timer = setTimeout(() => {
        certificate(lesson.id);
      }, 60000); // 60000 ms = 1 minute

      return () => clearTimeout(timer); // Clear the timer if the component unmounts or lesson.id changes
    }
  }, [lesson?.id, certificate]);

  useEffect(() => {
    if (cerData) {
      console.log('cert data', cerData);
    }

    if (cerErr) {
      console.log('cert Err', cerErr);
    }
  }, [cerData, cerErr]);

useEffect(()=>{
  userStreak()
},[])


  // Course Streak
const [createStrike]=useCourseStreakMutation();
useEffect(()=>{
 createStrike(lesson?.chapter?.courseId)

},[])


  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  
  return ( <Tabs defaultValue="notes" className="w-ful">
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
 Quizzes
  </TabsTrigger>
    
    
    
    <TabsTrigger  className=" rounded-full hidden" value="handout">handout</TabsTrigger>
    <TabsTrigger  className=" rounded-full hidden" value="Q&A">Q&A</TabsTrigger>
  </TabsList>

  <TabsContent value="notes">
 <div className=" p-3 md:p-4">
 <div className="flex flex-col   gap-20">
  

{lesson?.contents?.length?<div className="w-full space-y-10">
  {
     lesson?.contents.filter((c:any)=>!c.parentId)?.map((content:any)=>{
return <div key={content?.id}  className="w-full py-4 space-y-6">

  {content?.content?<div className="w-full" dangerouslySetInnerHTML={{ __html: content.content}}></div>:""}

  {content?.codeExample?<div className="flex w-full justify-center">
  <CodeHighlighterComponent codeString={content?.codeExample.code} language={content?.codeExample.language}/>
  </div>:""}
  
 {content?.image? <div className="w-full flex justify-center">
    <Image height={400} width={500} src={content?.image.public_url} alt="content image"/>
  </div>:""}

  {
     content?.subContents&&content?.subContents?.length? content.subContents?.map((content:any)=>{
return <div key={content?.id}  className="w-full py-6 space-y-6">

  {content?.content?<div className="w-full" dangerouslySetInnerHTML={{ __html: content.content}}></div>:""}

  {content?.codeExample?<div className="flex w-full justify-center">
  <CodeHighlighterComponent codeString={content?.codeExample.code} language={content?.codeExample.language}/>
  </div>:""}
  
 {content?.image? <div className="w-full flex justify-center">
    <Image height={400} width={500} src={content?.image.public_url} alt="content image"/>
  </div>:""}



  

</div>
     }):""
  }



</div>
     })
  }
      
      </div>:<div>No Contents</div>}

  </div> 
 </div>
  </TabsContent>



  <TabsContent value="exam">
  <div className=" overflow-hidden">


  

  <QuizClient lesson={lesson} />
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