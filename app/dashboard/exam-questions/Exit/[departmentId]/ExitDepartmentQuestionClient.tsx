import Banner from '@/components/banner'
import DashboardYearExamsCard from '@/components/card/DashboardYearExamsCard';
import YearExamCard from '@/components/card/yearExamsCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { exitExamYears } from '@/lib/examsYear'
import React from 'react'

interface ExitDepartmentQuestionClientProps{
  department:any;
 
}
const ExitDepartmentQuestionClient:React.FC<ExitDepartmentQuestionClientProps> = ({department}) => {
  return (<>
  <div className='min-h-screen w-full flex flex-col gap-10 '>
     <div className="p-4 md:p-6 lg:p-10 xl:p-20">
     <Banner title={`${department.departmentName}  Exit Exams`}>
<></>
     </Banner>
   
     </div>

     

 
  <div className="flex justify-center p-4 py-20">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {exitExamYears.map((year,index)=>{
          return <DashboardYearExamsCard key={index} year={year} url={`/dashboard/exam-questions/Exit/${department.id}/${year}`}/>
   
         })}
         
         
          
        </div>
      </div>




  

 

    </div></>
    
  )
}

export default ExitDepartmentQuestionClient