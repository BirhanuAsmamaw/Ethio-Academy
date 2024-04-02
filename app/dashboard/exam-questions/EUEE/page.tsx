
import Banner from '@/components/banner'
import ExamsCategoryCard from '@/components/card/examscategoryCard'
import Navbar from '@/components/navbar/Navbar'
import { eueeSubjects } from '@/lib/eueeSubjects'
import React from 'react'


import Header from '@/components/Header'

const EUEEPage = async() => {
 
 
  return (
    <>
    <Header
    title='Ethiopian University Entrance Exams'
    description='Ethiopian University Entrance Exams || All Exams With Answer and  Detail Exaplanations!'
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>
    <Navbar/>
    <div className='min-h-screen w-full flex flex-col gap-10  pt-10 pb-20'>
     <div className="p-4 md:p-6 lg:p-10 xl:p-20">
     <Banner title="Ethiopian University Entrance Exams">
   <></>
     </Banner>
     </div>

      <div className="flex justify-center p-4">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {eueeSubjects.map((euee:any,index:number)=>{
          return  <ExamsCategoryCard
          key={index}
           name={euee.subject}
           url={`/exams/EUEE/${euee.url}`}
           image={euee.cover}
           />
         })}
         
        </div>
      </div>

    </div>
    </>
  )
}

export default EUEEPage