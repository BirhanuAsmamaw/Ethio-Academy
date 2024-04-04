
import Banner from '@/components/banner'
import ExamsCategoryCard from '@/components/card/examscategoryCard'
import React from 'react'


import Header from '@/components/Header'
import { getDepartmentByName } from '@/actions/departments/getDepartmentByName'

const EUEEPage = async() => {
 
 const department=await getDepartmentByName("Highschool")
  return (
    <>
    <Header
    title='Ethiopian University Entrance Exams'
    description='Ethiopian University Entrance Exams || All Exams With Answer and  Detail Exaplanations!'
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>
    <div className='min-h-screen w-full flex flex-col gap-10  pt-10 pb-20'>
     <div className="p-4 md:p-6 lg:p-10 xl:p-20">
     <Banner title="Ethiopian University Entrance Exams">
   <></>
     </Banner>
     </div>

      <div className="flex justify-center p-4">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {department?.subject.map((euee:any,index:number)=>{
          return  <ExamsCategoryCard
          key={index}
           name={euee.subjectName}
           url={`/dashboard/exam-questions/EUEE/${euee.id}`}
           image={""}
           />
         })}
         
        </div>
      </div>

    </div>
    </>
  )
}

export default EUEEPage