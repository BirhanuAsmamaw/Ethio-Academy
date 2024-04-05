
import { getSubjectById } from '@/actions/subject/getSubjectById'
import Header from '@/components/Header'
import Banner from '@/components/banner'
import DashboardYearExamsCard from '@/components/card/DashboardYearExamsCard'
import { examsYears } from '@/lib/examsYear'
import React from 'react'

const ExamSubjectPage = async({params}:{params:{subject:string}}) => {
  const subject=await getSubjectById(params.subject)
  return (<>
  <Header
    title={`${subject?.subjectName} Remedial Exams`}
    description={` ${subject?.subjectName} Remedial Exams || All ${subject?.subjectName} Exams With Answer and  Detail Exaplanations!`}
    keywords='Programming, High School Courses, Freshman Courses, Remedial Exams, Exit Exams, Online Education, Lifelong Learning'
/>
  
  <div className='min-h-screen w-full flex flex-col gap-10 '>
     <div className="p-4 md:p-6 lg:p-10 xl:p-20">
     <Banner title={`${subject?.subjectName} Remedial Exams`} 
     isChange
      editUrl={`/dashboard/exam-questions/Remedial/${subject?.id}/update`}
      deleteUrl={`/dashboard/exam-questions/Remedial/${subject?.id}/delete`}
      ><></></Banner>
     </div>


  
  <div className="flex justify-center p-4 py-20">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {examsYears.map((year,index)=>{
          return <DashboardYearExamsCard key={index} year={year} url={`/dashboard/exam-questions/Remedial/${params.subject}/${year}`}/>
         })}
         
          
        </div>
      </div>


     

    </div></>
    
  )
}

export default ExamSubjectPage