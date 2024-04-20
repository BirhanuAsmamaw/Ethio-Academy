"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { LearningCourseClient } from './learningCourse'
import { ExamTakenClient } from './examsTaken'

interface LearningClientProps{
  courses:any[];
  exams:any[];

}
const LearningClient:React.FC<LearningClientProps> = ({courses,exams}) => {
  return (<Tabs defaultValue="courses" className=" w-full ">
  <TabsList className=" flex flex-wrap w-full gap-4 p-2 ">
    <TabsTrigger className="rounded-full bg-slate-100 dark:bg-gray-800  data-[state=active]:text-white data-[state=active]:bg-[#4C6FFF]" value="courses">Course</TabsTrigger>
    <TabsTrigger className="rounded-full bg-slate-100 dark:bg-gray-800  data-[state=active]:text-white data-[state=active]:bg-[#4C6FFF]"  value="exams">Exam</TabsTrigger>
  
  </TabsList>

  <TabsContent value="courses" className="flex justify-center mt-6">
  <LearningCourseClient courses={courses}/>
  </TabsContent>



  <TabsContent value="exams" className="flex justify-center mt-6">
 <ExamTakenClient exams={exams}/>
  </TabsContent>


</Tabs>
  )
}

export default LearningClient