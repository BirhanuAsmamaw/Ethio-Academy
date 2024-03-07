

import CourseSceleton from "../courseSceleton";
import Navbar from "@/components/navbar/Navbar";

import { getLessonById } from "@/actions/lessons/getLessonById";

import QuizClient from "./lessonQuestionClient";
import LessonClient from "./LessonClient";
import MainLayout from "@/components/layouts/mainLayout";
import SubLayout from "@/components/layouts/subLayout";
import CourseContent from "../../courseContent";
import Header from "@/components/Header";
import CustomeSheet from "@/components/customSheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


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
  <Header
    title={`${lesson.title}`}
    description={`${lesson.title}`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>
  <MainLayout>
   
      <CustomeSheet selectedLabel={<></>} unselectedLabel={<div  className="lg:hidden fixed right-0 top-14 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-xl z-50 p-1 md:p-2 rounded-l-full border-l-2 ">
        <p className=" font-semibold">Content</p>
      </div>}>
        <div className="space-y-2 w-full overflow-y-auto">
        <CourseContent course={lesson.chapter.course}/>
        </div>
      </CustomeSheet>
    

<SubLayout className="bg-white dark:bg-gray-800 dark:border-gray-700 border-gray-300 border-x-2 border-double">
<h1 className="text-lg md:xl lg:2xl font-medium md:font-semibold lg:font-bold">{lesson.title}</h1>

<div className="p-2 my-6">
 <video
     className="w-full h-auto max-w-full"
     controls
     poster={lesson.videoThumbnail || ''}
   >
     <source src={lesson.videoUrl || ''} type="video/mp4"  />
     Your browser does not support the video tag.
   </video></div>



<Tabs defaultValue="notes" className="w-full">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="notes">Notes</TabsTrigger>
    <TabsTrigger value="exam">Exam</TabsTrigger>
    <TabsTrigger value="handout">handout</TabsTrigger>
    <TabsTrigger value="Q&A">Q&A</TabsTrigger>
  </TabsList>

  <TabsContent value="notes">
  <LessonClient lesson={lesson}/>
  </TabsContent>



  <TabsContent value="exam">
  <QuizClient lesson={lesson}/>
  </TabsContent>

  <TabsContent value="handout">
  <p>handouts  like pdf ppt</p>
  </TabsContent>

  <TabsContent value="Q&A">
  <p>Question and Answers</p>
  </TabsContent>
</Tabs>



      </SubLayout>

    <div className="fixed w-[400px]  hidden lg:block top-20 right-4">
      <CourseContent course={lesson.chapter.course}/>
    </div>
    </MainLayout></> );
}
 
export default LessonPage;