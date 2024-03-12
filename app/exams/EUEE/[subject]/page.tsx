
import Banner from '@/components/banner'
import YearExamCard from '@/components/card/yearExamsCard'
import Navbar from '@/components/navbar/Navbar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { examsYears } from '@/lib/examsYear'
import React from 'react'

const ExamSubjectPage = ({params}:{params:{subject:string}}) => {
  return (<>
  <Navbar/>
  <div className='min-h-screen w-full flex flex-col gap-10 '>
     <div className="p-4 md:p-6 lg:p-10 xl:p-20">
     <Banner>
        <div className="flex  justify-center items-center h-[200px] lg:h-[400px]">
          <h1 className=' text-xl md:text-2xl lg:text-4xl xl:text-6xl text-green-500 
          dark:text-white font-bold xl:font-extra-bold'>{params.subject} Entrance Exams</h1>
        </div>
      </Banner>
     </div>

     
     <Tabs defaultValue="EUEE" className="w-full ">
 <div className="flex w-fulll justify-center">
 <TabsList className="grid w-full md:w-10/12 lg:w-8/12 xl:w-6/12 grid-cols-2 gap-4">
    <TabsTrigger className=" rounded-full border-gray-600" value="EUEE">EUEE</TabsTrigger>
    <TabsTrigger  className=" rounded-full border-gray-600" value="model">Model Exams</TabsTrigger>
  </TabsList>
 </div>

  <TabsContent value="EUEE">
  <div className="flex justify-center p-4 py-20">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {examsYears.map((year,index)=>{
          return <YearExamCard key={index} year={year} url={`/EUEE/${params.subject}/${year}`}/>
         })}
         
          
        </div>
      </div>
  </TabsContent>



  <TabsContent value="model">
  <div className="flex justify-center p-4 py-20">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {examsYears.map((year,index)=>{
          return <YearExamCard key={index} year={year} url={`/EUEE/${params.subject}/${year}`}/>
         })}
         
          
        </div>
      </div>
  </TabsContent>

 
</Tabs>


     

    </div></>
    
  )
}

export default ExamSubjectPage