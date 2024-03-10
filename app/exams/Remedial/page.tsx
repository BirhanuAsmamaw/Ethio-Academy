
import Banner from '@/components/banner'
import ExamsCategoryCard from '@/components/card/examscategoryCard'
import Navbar from '@/components/navbar/Navbar'
import { remedialSubjects } from '@/lib/remedialSubjects'
import React from 'react'

const RemedialExamPage = () => {
  return (<>
    <Navbar/>
    <div className='min-h-screen w-full flex flex-col gap-10  pt-10'>
     <div className="p-4 md:p-6 lg:p-10 xl:p-20">
     <Banner>
        <div className="flex  justify-center items-center h-[200px]">
          <h1 className='text-2xl text-white  font-bold'>Ethiopian University  Remedial Students  Exams</h1>
        </div>
      </Banner>
     </div>

      <div className="flex justify-center p-4">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {remedialSubjects.map((remedial:any,index:number)=>{
          return  <ExamsCategoryCard
          key={index}
           name={remedial.subject}
           url={`/exams/Remedial/${remedial.url}`}
           image={remedial.cover}
           />
         })}
         
        </div>
      </div>

    </div>
    </>
  )
}

export default RemedialExamPage