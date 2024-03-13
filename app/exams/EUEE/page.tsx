
import Banner from '@/components/banner'
import ExamsCategoryCard from '@/components/card/examscategoryCard'
import Navbar from '@/components/navbar/Navbar'
import { eueeSubjects } from '@/lib/eueeSubjects'
import React from 'react'

const EUEEPage = () => {
  return (
    <>
    <Navbar/>
    <div className='min-h-screen w-full flex flex-col gap-10  pt-10'>
     <div className="p-4 md:p-6 lg:p-10 xl:p-20">
     <Banner title="Ethiopian University Entrance Exams">
        
     <div className='flex justify-center w-full gap-6'>
    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Buy Exams Now!
</span>
</button>
<button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
See Tray Exams
</span>
</button>
    </div>
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