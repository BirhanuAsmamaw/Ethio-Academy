import Banner from '@/components/banner'
import YearExamCard from '@/components/card/yearExamsCard'
import { exitExamYears } from '@/lib/examsYear';
import React from 'react'
interface GATDepartmentClientProps{
  department:any;
}
const GATDepartmentClient:React.FC<GATDepartmentClientProps> = ({department}) => {
  return (<>
  <div className='min-h-screen w-full flex flex-col gap-10 '>
     <div className="p-4 md:p-6 lg:p-10 xl:p-20">
     <Banner>
        <div className="flex  justify-center items-center h-[200px]">
          <h1 className='text-2xl  text-white font-bold'>{department.departmentName}  GAT Exams</h1>
        </div>
      </Banner>
     </div>

      <div className="flex justify-center p-4 py-10">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {exitExamYears.map((year,index)=>{
          return <YearExamCard key={index} year={year} url={`/GAT/${department.id}/${year}`}/>
         })}
         
          
        </div>
      </div>

    </div></>
    
  )
}

export default GATDepartmentClient