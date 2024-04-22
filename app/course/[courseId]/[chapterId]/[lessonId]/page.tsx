

import CourseSceleton from "../courseSceleton";
import Navbar from "@/components/navbar/Navbar";

import { getLessonById } from "@/actions/lessons/getLessonById";

import LessonClient from "./LessonClient";
import MainLayout from "@/components/layouts/mainLayout";
import SubLayout from "@/components/layouts/subLayout";
import CourseContent from "../../courseContent";
import Header from "@/components/Header";
import CustomeSheet from "@/components/customSheet";
import LessonBlur from "./lessonBlur";
import { getCurrentUser } from "@/actions/users/currentUser";


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
  <MainLayout>
   
      <CustomeSheet selectedLabel={<></>} unselectedLabel={<div  className="lg:hidden fixed  h-screen overflow-y-auto right-0 top-14 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-xl z-50 p-1 md:p-2 rounded-l-full border-l-2 ">
        <p className=" font-semibold">Content</p>
      </div>}>
        <div className="space-y-2 w-full overflow-y-auto">
        <CourseContent course={lesson.chapter.course}/>
        </div>
      </CustomeSheet>
    

<SubLayout className="bg-white dark:bg-gray-800 dark:border-gray-700 border-gray-300 border-x-2 border-double">
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

    <div className="fixed w-[400px]  h-[700px]  overflow-y-auto lg:block top-16 right-4">
      <CourseContent course={lesson.chapter.course}/>
    </div>
    </MainLayout></> );
}
 
export default LessonPage;