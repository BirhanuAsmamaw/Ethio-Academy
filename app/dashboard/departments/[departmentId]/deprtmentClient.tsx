import Banner from '@/components/banner'
import DashboardYearExamsCard from '@/components/card/DashboardYearExamsCard';
import ExamsCategoryCard from '@/components/card/examscategoryCard';
import YearExamCard from '@/components/card/yearExamsCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { exitExamYears } from '@/lib/examsYear'
import React from 'react'

interface DepartmentClientProps{
  department:any;
 
}
const DepartmentClient:React.FC<DepartmentClientProps> = ({department}) => {
  return (<>
  <div className='min-h-screen w-full flex flex-col gap-10 '>
     <div className="p-4 md:p-6 lg:p-10 xl:p-20">
     <Banner 
     title={`${department?.departmentName}  Exit Exams`}
     isChange 
     deleteUrl={`/dashboard/department/${department?.id}/delete`}
    editUrl={`/dashboard/department/${department?.id}/update`}
     >
<></>
     </Banner>
   
     </div>

     
     <div className="flex justify-center p-4">
        {department?.subject?<div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {department?.subject.map((subject:any,index:number)=>{
          return  <ExamsCategoryCard
          key={index}
           name={subject.subjectName}
           url={`/dashboard/departments/${department.id}/${subject.id}`}
           image={subject?.cover?.public_url? subject?.cover?.public_url:""}
           />
         })}
         
        </div>:""}
      </div>
 
  




  

 

    </div></>
    
  )
}

export default DepartmentClient