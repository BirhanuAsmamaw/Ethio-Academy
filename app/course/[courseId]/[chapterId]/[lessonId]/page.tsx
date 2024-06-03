

import CourseSceleton from "../courseSceleton";
import Navbar from "@/components/navbar/Navbar";
import { IoListOutline } from "react-icons/io5";
import { getLessonById } from "@/actions/lessons/getLessonById";

import LessonClient from "./LessonClient";
import MainLayout from "@/components/layouts/mainLayout";
import SubLayout from "@/components/layouts/subLayout";
import CourseContent from "../../courseContent";
import Header from "@/components/Header";

import { getCurrentUser } from "@/actions/users/currentUser";
import { Sheet,  SheetContent,  SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { ScrollArea } from "@/components/ui/scroll-area";
import CourseBlur from "@/components/courseBlur";
import Container from "@/components/container/container";


interface IParams{
  lessonId: string
}
const LessonPage = async({params}:{params:IParams}) => {

  const lesson=await getLessonById(params.lessonId);
 

  const user=await getCurrentUser();
  
 

  const CoursesPayed = user?.payedCourses
  .filter((ps:any) => ps.status)
  .flatMap((payedCourse:any) => 
    payedCourse.courses.map((course:any) => {
      
      return course.course;
    })
  );

const isCoursePayed = CoursesPayed?.some((c:any) => c.id === lesson?.chapter?.course.id);


  if(!lesson){
    return <div className=""><CourseSceleton/> </div>
  }

  return (<>
  <Navbar/>
  {(!isCoursePayed&&lesson.chapter.course.price)?<CourseBlur user={user} course={lesson.chapter.course}/>:''}
  <Header
    title={`${lesson.title}`}
    description={`${lesson.title}`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>
<MainLayout className="w-full lg:px-4 xl:w-11/12 2xl:w-10/12  xl:px-10 2xl:px-20 lg:gap-10 lg:grid lg:grid-cols-12">
   
     
      <div className=" min-h-screen z-50 lg:hidden fixed right-0 top-14">
      <Sheet >
      <SheetTrigger asChild >
<IoListOutline size={40} className="bg-white rounded-l-md dark:bg-black shadow-lg z-20 p-2 border mt-6"/>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto p-1">
        <SheetHeader className="w-full">
          <SheetTitle><p className="text-[14px] pt-8 text-start">{lesson?.chapter?.course.course}</p></SheetTitle>
         
        </SheetHeader>
      
      <CourseContent course={lesson.chapter.course}/>
      
      </SheetContent>
    </Sheet>
      </div>
    

<Container className="bg-white col-span-8 my-10 py-10  dark:bg-gray-800 dark:border-gray-700 border-gray-300 border-x-2 border-double w-full">
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




<LessonClient lesson={lesson} isNotPayed={!isCoursePayed&&(lesson.chapter.course.price!=0)}/>


      </Container>

  
  <div className="col-span-4 right-0  pt-16  pb-24 relative hidden    overflow-x-hidden  overflow-y-auto 
    lg:block  ">
      <div className="fixed right-1 xl:right-10 2xl:right-16  lg:w-[350px] xl:w-[400px]">
   <ScrollArea className=" w-full   max-h-[75vh]  ">
   
     <CourseContent course={lesson.chapter.course}/>
   
    </ScrollArea>
   </div>
   </div>

    </MainLayout></> );
}
 
export default LessonPage;