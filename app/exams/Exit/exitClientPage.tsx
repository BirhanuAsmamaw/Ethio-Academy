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
  <Banner title="Ethiopian University Exit Exams">
      
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


<div className="flex justify-center m-4">
 <ExamsSearch examType='Exit' departments={departments}/>
</div>


  

 </div>
  )
}


export default ExitClientPage