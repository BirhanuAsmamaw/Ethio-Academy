"use client"
import CourseSceleton from "../courseSceleton";
import Navbar from "@/components/navbar/Navbar";
import QuizClient from "./lessonQuestionClient";
import LessonClient from "./LessonClient";
import MainLayout from "@/components/layouts/mainLayout";
import SubLayout from "@/components/layouts/subLayout";
import CourseContent from "../../courseContent";
import Header from "@/components/Header";
import CustomeSheet from "@/components/customSheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import LessonBlur from "./lessonBlur";


interface LessonClientPageProps{
  lesson: any;
}
const LessonClientPage:React.FC<LessonClientPageProps> = ({lesson}) => {
  
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    // Set a timeout to reload the page after 1 minute (60,000 milliseconds)
    const timeoutId = setTimeout(() => {
      setReloadPage(true);
    }, 5000);

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);



  // const user=user?.payedCourses.some((payedCourse) =>
  //   payedCourse.courses.some((course) => course.courseId === courseId)
  // );


if(reloadPage){
  return <LessonBlur/>

}

  
 else{

  if(!lesson){
    return <div className=""><CourseSceleton/> </div>
  }

  return (<>
  <Navbar/>
  <Header
    title={`${lesson.title}`}
    description={`${lesson.title}`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>
  <MainLayout>
   
      {/* <CustomeSheet selectedLabel={<></>} unselectedLabel={<div  className="lg:hidden fixed right-0 top-14 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-xl z-50 p-1 md:p-2 rounded-l-full border-l-2 ">
        <p className=" font-semibold">Content</p>
      </div>}>
        <div className="space-y-2 w-full overflow-y-auto">
        <CourseContent course={lesson?.chapter?.course}/>
        </div>
      </CustomeSheet> */}
    

<SubLayout className="bg-white dark:bg-gray-800 dark:border-gray-700 border-gray-300 border-x-2 border-double">
<h1 className="text-lg md:xl lg:2xl font-medium md:font-semibold lg:font-bold">{lesson?.title}</h1>

<div className="p-2 my-6">
 <video
     className="w-full h-auto max-w-full"
     controls
     poster={lesson?.videoThumbnail || ''}
   >
     <source src={lesson?.videoUrl || ''} type="video/mp4"  />
     Your browser does not support the video tag.
   </video></div>



<Tabs defaultValue="notes" className="w-full">
  <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-4">
    <TabsTrigger className="rounded-full" value="notes">Notes</TabsTrigger>
    <TabsTrigger  className="rounded-full" value="exam">Exam</TabsTrigger>
    <TabsTrigger  className=" rounded-full" value="handout">handout</TabsTrigger>
    <TabsTrigger  className="rounded-full" value="Q&A">Q&A</TabsTrigger>
  </TabsList>

  <TabsContent value="notes">
 <div className="mt-20">
 <LessonClient lesson={lesson}/>
 </div>
  </TabsContent>



  <TabsContent value="exam">
  <div className="mt-20">
  <QuizClient lesson={lesson}/>
  </div>
  </TabsContent>

  <TabsContent value="handout">
  <div className="mt-20">
  <p className="text-2xl font-bold p-2">handouts  like pdf ppt</p>
  </div>
  </TabsContent>

  <TabsContent value="Q&A">
  <div className="mt-20">
  <p>Question and Answers</p>
  </div>
  </TabsContent>
</Tabs>



      </SubLayout>

    {/* <div className="fixed w-[400px]  hidden lg:block top-20 right-4">
      <CourseContent course={lesson?.chapter?.course}/>
    </div> */}
    </MainLayout></> );
}}
 
export default LessonClientPage;