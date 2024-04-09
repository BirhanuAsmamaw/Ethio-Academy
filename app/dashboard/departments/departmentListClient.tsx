"use client"

import Banner from '@/components/banner'
import React from 'react'
import DepartmentSearch from './departmentsSearch';


interface ExitClientPageProps{
  departments:any[];
}
const DepartmentsListClientPage:React.FC<ExitClientPageProps> = ({departments}) => {
  
  return (<div className='min-h-screen w-full flex flex-col gap-10 '>
  <div className="p-4 md:p-6 lg:p-10 xl:p-20">
  <Banner 
  title="Ethio  Exams Academy Departments List"
  
  >
 <></>
  </Banner>
  </div>


<div className="flex justify-center m-4">


 <DepartmentSearch examType='Exit' departments={departments}/>



</div>


  

 </div>
  )
}


export default DepartmentsListClientPage