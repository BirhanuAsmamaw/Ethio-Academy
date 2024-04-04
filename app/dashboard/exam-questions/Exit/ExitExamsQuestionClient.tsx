"use client"

import Banner from '@/components/banner'
import ExamsSearch from '@/components/examsSearch';
import React from 'react'


interface ExitClientPageProps{
  departments:any[];
}
const ExitQuestionClientPage:React.FC<ExitClientPageProps> = ({departments}) => {
  
  return (<div className='min-h-screen w-full flex flex-col gap-10 '>
  <div className="p-4 md:p-6 lg:p-10 xl:p-20">
  <Banner 
  title="Ethiopian University Exit Exams"
  
  >
 <></>
  </Banner>
  </div>


<div className="flex justify-center m-4">
 <ExamsSearch examType='Exit' departments={departments}/>
</div>


  

 </div>
  )
}


export default ExitQuestionClientPage