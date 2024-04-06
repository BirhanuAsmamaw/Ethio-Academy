"use client"
import Banner from '@/components/banner'
import YearExamCard from '@/components/card/yearExamsCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { exitExamYears } from '@/lib/examsYear'
import React, { useState } from 'react'
import BuyExamButton from '../../buyExamButton';
interface ExitDepartmentClientProps{
  department:any;
  isCourseDepartment:any;
  universities:any[]|null;
}
const ExitDepartmentClient:React.FC<ExitDepartmentClientProps> = ({universities,department,isCourseDepartment}) => {
  const [universityCode,setUniversityCode]=useState<string|any>(null)
  return (<>
  <div className='min-h-screen w-full flex flex-col gap-10 '>
     <div className="p-4 md:p-6 lg:p-10 xl:p-20">
     <Banner title={`${department.departmentName}  Exit Exams`}>
     {isCourseDepartment? <></>:<BuyExamButton department={department} />}
     </Banner>
   
     </div>

     


      <Tabs defaultValue="Exit" className="w-full ">
 <div className="flex w-fulll justify-center">
 <TabsList className="grid w-full md:w-10/12 lg:w-8/12 xl:w-6/12 grid-cols-2 gap-4">
    <TabsTrigger className=" rounded-full border-gray-600" value="Exit">Exit Exams</TabsTrigger>
    <TabsTrigger  className=" rounded-full border-gray-600" value="model">Model Exams</TabsTrigger>
  </TabsList>
 </div>

  <TabsContent value="Exit">
  <div className="flex justify-center p-4 py-20">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {exitExamYears.map((year,index)=>{
          return <YearExamCard key={index} year={year} url={`/Exit/${department.id}/${year}?`}/>
         })}
         
         
          
        </div>
      </div>
  </TabsContent>



  <TabsContent value="model"  className="w-full flex flex-col md:flex-row gap-20">

    <div className=" space-y-2 border-2 p-4">
     {universities?.map((university:any)=>{
      return <button className={`border p-2 ${(universityCode===university.code)&&'bg-green-200 dark:bg-green-900'}`} key={university?.id} onClick={()=>{setUniversityCode(university.code)}}>{university?.name}</button>
     })}
    </div>
  <div className="flex justify-center p-4 py-20">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {exitExamYears.map((year,index)=>{
          return <YearExamCard key={index} year={year} url={`/Exit/${department.id}/${year}/model?university=${universityCode}&`}/>
         })}
         
         
          
        </div>
      </div>

  </TabsContent>

 
</Tabs>

    </div></>
    
  )
}

export default ExitDepartmentClient