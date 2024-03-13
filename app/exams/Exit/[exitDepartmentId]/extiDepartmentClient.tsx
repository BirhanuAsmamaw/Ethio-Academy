import Banner from '@/components/banner'
import YearExamCard from '@/components/card/yearExamsCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { exitExamYears } from '@/lib/examsYear'
import React from 'react'
interface ExitDepartmentClientProps{
  department:any;
}
const ExitDepartmentClient:React.FC<ExitDepartmentClientProps> = ({department}) => {
  return (<>
  <div className='min-h-screen w-full flex flex-col gap-10 '>
     <div className="p-4 md:p-6 lg:p-10 xl:p-20">
     <Banner title={`${department.departmentName}  Exit Exams`}>
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
          return <YearExamCard key={index} year={year} url={`/Exit/${department.id}/${year}`}/>
         })}
         
         
          
        </div>
      </div>
  </TabsContent>



  <TabsContent value="model">
  <div className="flex justify-center p-4 py-20">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {exitExamYears.map((year,index)=>{
          return <YearExamCard key={index} year={year} url={`/Exit/${department.id}/${year}`}/>
         })}
         
         
          
        </div>
      </div>
  </TabsContent>

 
</Tabs>

    </div></>
    
  )
}

export default ExitDepartmentClient