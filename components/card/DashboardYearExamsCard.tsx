

"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
interface DashboardYearExamsCardProps{
  year: string;
  url: string;
}
const DashboardYearExamsCard:React.FC<DashboardYearExamsCardProps> = ({year,url}) => {
  const router=useRouter();
  const onCheckRight=()=>{
    
    router.push(`${url}`)
  }

 
  return (
    <div  className="no-underline block w-full md:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
     <div className="flex flex-col gap-4 justify-center items-center p-2">
      <h1 className='text-lg font-semibold'>{year} E.C  Year Exams</h1>
      <button onClick={onCheckRight}>Click Here</button>
     </div>
    </div>
  )
}

export default DashboardYearExamsCard