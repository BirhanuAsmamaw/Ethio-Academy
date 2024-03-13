"use client"

import Banner from '@/components/banner'
import React from 'react'
import ExamsSearch from '../examsSearch'
import BuyExamButton from '../buyExamButton';

interface GATClientPageProps{
  departments:any[];
}
const GATClientPage:React.FC<GATClientPageProps> = ({departments}) => {
  
  return (<div className='min-h-screen w-full flex flex-col gap-10 '>
  <div className="p-4 md:p-6 lg:p-10 xl:p-20">
  <Banner title="Ethiopian University GAT Exams">
   <BuyExamButton/>
  </Banner>
  
  </div>


<div className="flex justify-center m-4">
 <ExamsSearch examType='GAT' departments={departments}/>
</div>


  

 </div>
  )
}


export default GATClientPage