
"use client"
import Header from '@/components/Header'
import Banner from '@/components/banner'
import YearExamCard from '@/components/card/yearExamsCard'
import Navbar from '@/components/navbar/Navbar'
import { examsYears } from '@/lib/examsYear'
import React, { useState } from 'react'

interface ExamSubjectPageProps{
  subject: any;
  universities: any[]|null;
}
const ExamSubjectClientPage:React.FC<ExamSubjectPageProps> = ({subject,universities}) => {

 const [universityCode,setUniversityCode]=useState<string|null>(null)
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
<div className="flex flex-col md:flex-row py-10 md:px-10 lg:px-20 gap-6 md:gap-20">
<div className="w-[300px] p-2 py-6 bg-white dark:bg-slate-800 h-[500px] overflow-y-auto">
   <div className="  p-0 flex flex-col ">
   <button className={`border-b dark:border-gray-600 p-2 hover:bg-slate-100 hover:dark:bg-slate-700  transition-all duration-300  ${!universityCode&&'bg-slate-100 dark:bg-slate-700 font-semibold'}`} onClick={()=>{setUniversityCode(null)}}>All University Exam</button>
     {universities?universities?.map((university:any)=>{
      return <button className={`border-b dark:border-gray-600 p-2 hover:bg-slate-100 hover:dark:bg-slate-700  transition-all duration-300 ${(universityCode===university.code)&&'bg-slate-100 dark:bg-slate-700 font-semibold'}`} key={university?.id} onClick={()=>{setUniversityCode(university.code)}}>{university?.name}</button>
     }):""}
    </div>
   </div>
  
  <div className="flex justify-center p-4 py-20">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {examsYears.map((year,index)=>{
          return <YearExamCard 
          key={index}
           year={year}  
           url={`/COC/${subject?.id}/${year}${universityCode?`?university=${universityCode}&`:'?'}`}/>
         })}
         
          
        </div>
      </div>
      </div>






     

    </div></>
    
  )
}

export default ExamSubjectClientPage 