
import { getSubjectById } from '@/actions/subject/getSubjectById'
import Header from '@/components/Header'
import Banner from '@/components/banner'
import YearExamCard from '@/components/card/yearExamsCard'
import Navbar from '@/components/navbar/Navbar'
import { examsYears } from '@/lib/examsYear'
import React from 'react'

const ExamSubjectPage = async({params}:{params:{subject:string}}) => {
  const subject=await getSubjectById(params.subject)
  if(!subject) return null;
  return (<>
  <Header
    title={`${subject?.subjectName} COC Exams`}
    description={` ${subject?.subjectName} COC Exams || All ${subject?.subjectName} Exams With Answer and  Detail Exaplanations!`}
    keywords='Programming, High School Courses, Freshman Courses, COC Exams, Exit Exams, Online Education, Lifelong Learning'
/>
  <Navbar/>
  <div className='min-h-screen w-full flex flex-col gap-10 '>
     <div className="p-4 md:p-6 lg:p-10 xl:p-20">
     <Banner title={`${subject?.subjectName} COC Exams`}><></></Banner>
     </div>




{/* COC*/}
  
  <div className="flex justify-center p-4 py-20">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {examsYears.map((year,index)=>{
          return <YearExamCard key={index} year={year} url={`/COC/${params.subject}/${year}?university=AAU`}/>
         })}
         
          
        </div>
      </div>
 






     

    </div></>
    
  )
}

export default ExamSubjectPage