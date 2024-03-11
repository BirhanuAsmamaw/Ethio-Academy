"use client"

import Banner from '@/components/banner'
import React from 'react'
import ExamsSearch from '../examsSearch'

interface ExitClientPageProps{
  departments:any[];
}
const ExitClientPage:React.FC<ExitClientPageProps> = ({departments}) => {
  
  return (<div className='min-h-screen w-full flex flex-col gap-10 '>
  <div className="p-4 md:p-6 lg:p-10 xl:p-20">
  <Banner>
     <div className="flex  justify-center items-center h-[200px]">
       <h1 className='text-2xl text-white  font-bold'>Ethiopian University Exit Exams</h1>
     </div>
   </Banner>
  </div>


<div className="flex justify-center m-4">
 <ExamsSearch departments={departments}/>
</div>


  

 </div>
  )
}


export default ExitClientPage