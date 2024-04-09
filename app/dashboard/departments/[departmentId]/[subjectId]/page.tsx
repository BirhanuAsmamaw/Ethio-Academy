
import { getSubjectById } from '@/actions/subject/getSubjectById'
import Header from '@/components/Header'
import Banner from '@/components/banner'
import DashboardYearExamsCard from '@/components/card/DashboardYearExamsCard'
import ExamsCategoryCard from '@/components/card/examscategoryCard'
import { examsYears } from '@/lib/examsYear'
import React from 'react'

const ExamSubjectPage = async({params}:{params:{subjectId:string,departmentId:string}}) => {
  const subject=await getSubjectById(params.subjectId)
  if(!subject){
    return null
  }
  return (<>
  <Header
    title={`${subject?.subjectName} Entrance Exams`}
    description={` ${subject?.subjectName} Entrance Exams || All ${subject?.subjectName} Exams With Answer and  Detail Exaplanations!`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>
  
  <div className='min-h-screen w-full flex flex-col gap-10 '>
     <div className="p-4 md:p-6 lg:p-10 xl:p-20">
     <Banner title={`${subject?.subjectName} Entrance Exams`} 
     isChange
     addName='Course'
     addUrl={`/dashboard/departments/${params.departmentId}/${subject?.id}/course/add-course`}
      editUrl={`/dashboard/exam-questions/EUEE/${subject?.id}/update`}
      deleteUrl={`/dashboard/exam-questions/EUEE/${subject?.id}/delete`}
      ><></></Banner>
     </div>


{subject&&subject?.course?<div className="flex justify-center p-4">
   <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {subject?.course?.map((course:any,index:number)=>{
     return  <ExamsCategoryCard
     key={index}
      name={course.course}
      url={`/dashboard/departments/${course.department.id}/${subject.id}/course`}
      image={subject?.cover?.public_url? subject?.cover?.public_url:""}
      />
    })}
    
   </div>
 </div>:""
}

  
  <div className="flex justify-center p-4 py-20">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {examsYears.map((year,index)=>{
          return <DashboardYearExamsCard key={index} year={year} url={`/dashboard/departments/${params.departmentId}/${params.subjectId}/exam/${year}`}/>
         })}
         
          
        </div>
      </div>


     

    </div></>
    
  )
}

export default ExamSubjectPage