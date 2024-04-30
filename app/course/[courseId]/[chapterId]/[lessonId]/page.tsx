

import CourseSceleton from "../courseSceleton";
import Navbar from "@/components/navbar/Navbar";

import { getLessonById } from "@/actions/lessons/getLessonById";

import LessonClient from "./LessonClient";
import MainLayout from "@/components/layouts/mainLayout";
import SubLayout from "@/components/layouts/subLayout";
import CourseContent from "../../courseContent";
import Header from "@/components/Header";
import LessonBlur from "./lessonBlur";
import { getCurrentUser } from "@/actions/users/currentUser";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";


interface IParams{
  lessonId: string
}
const LessonPage = async({params}:{params:IParams}) => {

  const lesson=await getLessonById(params.lessonId);
 

  const user=await getCurrentUser();
  
const isCoursePayed=user?.payedCourses.some((payedCourse) =>
payedCourse.courses.some((course) => course.id === lesson?.chapter.course.id)&&payedCourse.status
);


  if(!lesson){
    return <div className=""><CourseSceleton/> </div>
  }

  return (<>
  <Navbar/>
  {(!isCoursePayed&&lesson.chapter.course.price)?<LessonBlur user={user} course={lesson.chapter.course}/>:''}
  <Header
    title={`${lesson.title}`}
    description={`${lesson.title}`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>
  <MainLayout >
   
     
      <div className=" min-h-screen  lg:hidden fixed right-1 top-14">
      <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="z-10 shadow-lg">contents</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{lesson?.chapter?.course.course}</SheetTitle>
         
        </SheetHeader>
        <CourseContent course={lesson.chapter.course}/>
      </SheetContent>
    </Sheet>
      </div>
    

<SubLayout className="bg-white my-10 py-10 dark:bg-gray-800 dark:border-gray-700 border-gray-300 border-x-2 border-double">
<h1 className="text-lg md:xl lg:2xl font-medium md:font-semibold lg:font-bold">{lesson.title}</h1>

{lesson.videoThumbnail?<div className=" my-6">
 <video
     className="w-full h-auto max-w-full"
     controls
     poster={lesson.videoThumbnail?.public_url || ''}
   >
     <source src={lesson.videoUrl?.public_url || ''} type="video/mp4"  />
     Your browser does not support the video tag.
   </video></div>:""}




<LessonClient lesson={lesson}/>


      </SubLayout>

    <div className="fixed w-[400px] h-screen py-20   hidden overflow-x-hidden  overflow-y-auto 
    lg:block  right-2">
     <div className="my-20 pr-4">
     <CourseContent course={lesson.chapter.course}/>
     </div>
    </div>
    </MainLayout></> );
}
 
export default LessonPage;