
import { getSubjectById } from '@/actions/subject/getSubjectById'
import Header from '@/components/Header'
import Banner from '@/components/banner'
import DashboardYearExamsCard from '@/components/card/DashboardYearExamsCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { examsYears } from '@/lib/examsYear'
import React from 'react'
import { CourseListClient } from './course/courseListClient'

const ExamSubjectPage = async({params}:{params:{subjectId:string,departmentId:string}}) => {
  const subject=await getSubjectById(params.subjectId)
  if(!subject){
    return null
  }
  return (<>
  <Header
    title={`${subject?.subjectName} Entrance Exams`}
    description={` ${subject?.subjectName} Entrance Exams || All ${subject?.subjectName} Exams With Answer and  Detail Exaplanations!`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Course Exams, Online Education, Lifelong Learning'
/>
  
  <div className='min-h-screen w-full flex flex-col gap-10 '>
     <div className="p-4 md:p-6 lg:p-10 xl:p-20">
     <Banner title={`${subject?.subjectName}`} 
     isChange
     backUrl={`/dashboard/departments/${params.departmentId}`}
     addName='Course'
     addUrl={`/dashboard/departments/${params.departmentId}/${subject?.id}/course/add-course`}
      editUrl={`/dashboard/departments/${params.departmentId}/${subject?.id}/update`}
      deleteUrl={`/dashboard/departments/${params.departmentId}/${subject?.id}/delete`}
      ><></></Banner>
     </div>



      <Tabs defaultValue="Course" className="w-full ">
 <div className="flex w-fulll justify-center">
 <TabsList className="grid w-full md:w-10/12 lg:w-8/12 xl:w-6/12 grid-cols-2 gap-4">
    <TabsTrigger className=" rounded-full border-gray-600" value="Course">Courses</TabsTrigger>
    <TabsTrigger  className=" rounded-full border-gray-600" value="exam">Exams</TabsTrigger>
  </TabsList>
 </div>

  <TabsContent value="Course" className='p-10'>
  <CourseListClient courses={subject?.course||null}/>
  </TabsContent>



  <TabsContent value="exam"  className="w-full md:p-10  flex flex-col md:flex-row ">

  <div className="flex justify-center w-full">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
         {examsYears.map((year,index)=>{
          return <DashboardYearExamsCard key={index} year={year} url={`/dashboard/departments/${params.departmentId}/${params.subjectId}/exam/${year}`}/>
         })}
         
          
        </div>
      </div>

  </TabsContent>

 
</Tabs>

     

    </div></>
    
  )
}

export default ExamSubjectPage