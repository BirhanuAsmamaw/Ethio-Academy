

import CourseSceleton from "../courseSceleton";
import Navbar from "@/components/navbar/Navbar";

import { getLessonById } from "@/actions/lessons/getLessonById";

import QuizClient from "./lessonQuestionClient";
import LessonClient from "./LessonClient";
import MainLayout from "@/components/layouts/mainLayout";
import SubLayout from "@/components/layouts/subLayout";
import CourseContent from "../../courseContent";


interface IParams{
  lessonId: string
}
const LessonPage = async({params}:{params:IParams}) => {

  const lesson=await getLessonById(params.lessonId);
  
console.log("lessons data",lesson);
  if(!lesson){
    return <div className=""><CourseSceleton/> </div>
  }

  return (<>
  <Navbar/>
  <MainLayout>
    <div className="lg:hidden fixed right-0 top-14 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-xl z-50 p-1 md:p-2 rounded-l-full border-l-2 ">
      <p className="text-sm md:text-lg font-bold text-green-500 ">content</p>
    </div>

<SubLayout className="bg-white dark:bg-gray-800 dark:border-gray-700 border-gray-300">
<LessonClient lesson={lesson}/>
<QuizClient lesson={lesson}/>
      </SubLayout>

    <div className="fixed w-[400px]  hidden lg:block top-20 right-4">
      <CourseContent course={lesson.chapter.course}/>
    </div>
    </MainLayout></> );
}
 
export default LessonPage;