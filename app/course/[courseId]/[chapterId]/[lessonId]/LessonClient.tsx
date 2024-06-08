'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useEffect, useState } from "react";
import Image from "next/image";
import CodeHighlighterComponent from "@/components/codeHighlighter";
import { useCourseCertificateMutation, useCourseStreakMutation } from "@/redux/features/course/courseApi";
import { useUserStreakMutation } from "@/redux/features/user/userApi";
import QuizClient from "./lessonQuestionClient";
import { ScrollArea } from "@/components/ui/scroll-area";
import CourseContent from "../../courseContent";
import Header from "@/components/Header";
import Container from "@/components/container/container";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { IoListOutline } from "react-icons/io5";
import MainLayout from "@/components/layouts/mainLayout";
import CourseSceleton from "../courseSceleton";
import { useGetPaymentCourseQuery } from "@/redux/features/payments/paymentApi";
import { useGetLessonQuery } from "@/redux/features/lesson/lessonApi";
import CourseBlur from "@/components/courseBlur";
import { useRouter } from "next/navigation";



interface dataClientProps {
  lessonId: string;
 
}

const LessonClient: React.FC<dataClientProps> = ({ lessonId }) => {
  const [mounted, setMounted] = useState(false);
  const [userStreak] = useUserStreakMutation();
  const [certificate] = useCourseCertificateMutation();
  const [courseStreak] = useCourseStreakMutation();
 const router=useRouter()
  
  useEffect(() => {
    setMounted(true);
  }, []);

  

  const {data,isSuccess,isError,isUninitialized,isLoading}=useGetLessonQuery(lessonId)

  const {data:payedCourse,isSuccess:payedSuccess,isError:paymentError}=useGetPaymentCourseQuery(data&&data?.chapter?.courseId);

 




// COURSE CERTIFICATE POINT
  useEffect(() => {
    
    if (payedSuccess&&payedCourse?.isCoursePayed && isSuccess) {
      
      const timer = setTimeout(() => {
        certificate(data.id);
        router.refresh()
      }, 60000); // 60000 ms = 1 minute

      return () => clearTimeout(timer); // Clear the timer if the component unmounts or data.id changes
    }
  }, [payedCourse?.isCoursePayed,isSuccess, data?.id, certificate]);



  // USER STREAK 
  useEffect(() => {
    if (payedSuccess&&payedCourse?.isCoursePayed && isSuccess) {
      userStreak();
      router.refresh()
    }
  }, [payedCourse?.isCoursePayed,isSuccess, userStreak]);





  // COURSE STREAK 
  useEffect(() => {
    if (payedSuccess&&payedCourse?.isCoursePayed && isSuccess&&data?.chapter?.courseId) {
      courseStreak(data.chapter.courseId);
      router.refresh()
    }
  }, [payedCourse?.isCoursePayed,isSuccess,data?.chapter?.courseId, courseStreak]);

  if (!mounted) return <></>;


  if (isLoading || isUninitialized) {
    return (
      <div className="flex w-full min-h-screen justify-center py-10">
        <div className="w-full md:w-10/12  lg:w-8/12 xl:w-7/12 2xl:w-6/12 flex flex-col gap-10 pt-10">
          <CourseSceleton />
        </div>
      </div>
    );
  }

  if(isError){
    return <div className="flex justify-center items-center h-screen">
      <h1> Oops! Something went wrong</h1>
    </div>
  }

  return (<div className="">
   {((payedSuccess&&!payedCourse.isCoursePayed)||paymentError)?<CourseBlur isUser={payedCourse?.isUser} course={data&&data?.chapter?.course}/>:""}
  <Header
   title={`${data&&data?.title}`}
   description={`${data&&data?.title}`}
   keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>
  {data&&isSuccess?<MainLayout className="w-full lg:px-4 xl:w-11/12 2xl:w-10/12  xl:px-10 2xl:px-20 lg:gap-10 lg:grid lg:grid-cols-12">

  
     
  <div className=" min-h-screen z-50 lg:hidden fixed right-0 top-14">
  <Sheet>
  <SheetTrigger asChild >
<IoListOutline size={40} className="bg-white rounded-l-md dark:bg-black shadow-lg z-20 p-2 border mt-6"/>
  </SheetTrigger>
  <SheetContent className="overflow-y-auto custom-scrollbar p-1">
    <SheetHeader className="w-full">
      <SheetTitle><p className="text-[14px] pt-8 text-start">{data?.chapter?.course.course}</p></SheetTitle>
     
    </SheetHeader>
  
  <CourseContent course={data?.chapter.course}/>
  
  </SheetContent>
</Sheet>
  </div>


<Container className="bg-white col-span-8 my-10 py-10  dark:bg-gray-800 dark:border-gray-700 border-gray-300 border-x-2 border-double w-full">
<h1 className="text-lg md:xl lg:2xl font-medium md:font-semibold lg:font-bold">{data?.title}</h1>

{data?.videoThumbnail?<div className=" my-6">
<video
 className="w-full h-auto max-w-full"
 controls
 poster={data?.videoThumbnail?.public_url || ''}
>
 <source src={data?.videoUrl?.public_url || ''} type="video/mp4"  />
 Your browser does not support the video tag.
</video></div>:""}

<Tabs defaultValue="notes" className="w-full">
     <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-4">
       <TabsTrigger
         className="
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
         "
         value="notes"
       >
         Notes
       </TabsTrigger>

       <TabsTrigger
         className="
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
         "
         value="exam"
       >
         Quizzes
       </TabsTrigger>

       <TabsTrigger className="rounded-full hidden" value="handout">
         Handout
       </TabsTrigger>
       <TabsTrigger className="rounded-full hidden" value="Q&A">
         Q&A
       </TabsTrigger>
     </TabsList>

     <TabsContent value="notes">
       <div className="p-3 md:p-4">
         <div className="flex flex-col gap-20">
           {data?.contents?.length ? (
             <div className="w-full space-y-10">
               {data?.contents
                 .filter((c: any) => !c.parentId)
                 .map((content: any) => (
                   <div key={content?.id} className="w-full py-4 space-y-6">
                     {content?.content ? (
                       <div className="w-full" dangerouslySetInnerHTML={{ __html: content.content }}></div>
                     ):null}

                     {content?.codeExample ? (
                       <div className="flex w-full justify-center">
                         <CodeHighlighterComponent
                           codeString={content?.codeExample.code}
                           language={content?.codeExample.language}
                         />
                       </div>
                     ):null}

                     {content?.image? (
                       <div className="w-full flex justify-center">
                         <Image height={400} width={500} src={content?.image.public_url} alt="content image" />
                       </div>
                     ):null}

                     {content?.subContents &&
                       content.subContents.length ?
                       content.subContents.map((subContent: any) => (
                         <div key={subContent?.id} className="w-full py-6 space-y-6">
                           {subContent?.content? (
                             <div className="w-full" dangerouslySetInnerHTML={{ __html: subContent.content }}></div>
                           ):null}

                           {subContent?.codeExample ? (
                             <div className="flex w-full justify-center">
                               <CodeHighlighterComponent
                                 codeString={subContent?.codeExample.code}
                                 language={subContent?.codeExample.language}
                               />
                             </div>
                           ):null}

                           {subContent?.image ? (
                             <div className="w-full flex justify-center">
                               <Image height={400} width={500} src={subContent?.image.public_url} alt="content image" />
                             </div>
                           ):null}
                         </div>
                       )):null}
                   </div>
                 ))}
             </div>
           ) : (
             <div>No Contents</div>
           )}
         </div>
       </div>
     </TabsContent>

     <TabsContent value="exam">
       <div className="overflow-hidden">
         <QuizClient lesson={data} />
       </div>
     </TabsContent>

     <TabsContent className="hidden" value="handout">
       <div>
         <p className="text-2xl font-bold p-2">Handouts like PDF, PPT</p>
       </div>
     </TabsContent>

     <TabsContent className="hidden" value="Q&A">
       <div>
         <p>Question and Answers</p>
       </div>
     </TabsContent>
   </Tabs>

  </Container>


<div className="col-span-4 right-0  pt-16  pb-24 relative hidden    overflow-x-hidden  
lg:block  ">
  
<div className=" overflow-y-auto  custom-scrollbar fixed right-1 xl:right-10 2xl:right-16  lg:w-[350px] xl:w-[400px] w-full p-1   max-h-[75vh]  ">

 <CourseContent course={data?.chapter.course}/>

</div>

</div>

</MainLayout>:""}
</div>
  );
};

export default LessonClient;





