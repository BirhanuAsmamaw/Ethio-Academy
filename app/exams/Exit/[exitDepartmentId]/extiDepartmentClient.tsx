"use client"
import Banner from '@/components/banner'
import YearExamCard from '@/components/card/yearExamsCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { exitExamYears } from '@/lib/examsYear'
import React, { useState } from 'react'
import BuyExamButton from '../../buyExamButton';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from '@/components/ui/command';

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



  <TabsContent value="model"  className="w-full md:px-10 lg:px-20 flex flex-col md:flex-row gap-10">


  <Command className="rounded-lg border w-full m-2 md:w-[400px] shadow-md">
      <CommandInput placeholder="University search..." />
      <CommandList>
        <CommandEmpty>No University found.</CommandEmpty>
        <CommandGroup >
          <button className='w-full' onClick={()=>{setUniversityCode(null)}}>
          <CommandItem  className={`${!universityCode&&'bg-slate-100 dark:bg-slate-700 font-semibold'}`}>
          <span>All University Exam</span>
            <CommandShortcut>All</CommandShortcut>
          </CommandItem>
          </button>

          {universities?.map((university:any)=>{
      return <button key={university?.id} 
      className='w-full'
       onClick={()=>{setUniversityCode(university.code)}}>
        <CommandItem className={`${(universityCode===university.code)&&'bg-slate-100 dark:bg-slate-700 font-semibold'}`} >
        <span >{university?.name}</span>
      <CommandShortcut>{university.code}</CommandShortcut>
      </CommandItem> 
      </button> 
     })}
          
       
        </CommandGroup>
      </CommandList>
    </Command>
   

    
    
 


  <div className="flex w-full justify-center p-4 py-20">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {exitExamYears.map((year,index)=>{
          return <YearExamCard key={index} year={year} url={`/Exit/${department.id}/${year}/model${universityCode?`?university=${universityCode}&`:'?'}`}/>
         })}
         
         
          
        </div>
      </div>

  </TabsContent>

 
</Tabs>

    </div></>
    
  )
}

export default ExitDepartmentClient