
import { getSubjectById } from '@/actions/subject/getSubjectById'
import Header from '@/components/Header'
import Banner from '@/components/banner'
import YearExamCard from '@/components/card/yearExamsCard'
import Navbar from '@/components/navbar/Navbar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { examsYears } from '@/lib/examsYear'
import React from 'react'

const ExamSubjectPage = async({params}:{params:{subject:string}}) => {
  const subject=await getSubjectById(params.subject)
  if(!subject) return null;
  return (<>
  <Header
    title={`${subject?.subjectName} Entrance Exams`}
    description={` ${subject?.subjectName} Entrance Exams || All ${subject?.subjectName} Exams With Answer and  Detail Exaplanations!`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>
  <Navbar/>
  <div className='min-h-screen w-full  pb-20 flex flex-col  gap-10 '>
     <div className="p-4 md:p-6 lg:p-10 mt-10 xl:p-20">
     <Banner title={`${subject?.subjectName} Entrance Exams`}><></></Banner>
     </div>


     <Tabs defaultValue="EUEE" className="w-full ">
 <div className="flex w-fulll justify-center">
 <TabsList className="grid w-full md:w-10/12 lg:w-8/12 xl:w-6/12 grid-cols-2 gap-4">
    <TabsTrigger className=" rounded-full border-gray-600" value="EUEE">EUEE</TabsTrigger>
    <TabsTrigger  className=" rounded-full border-gray-600" value="model">Model Exams</TabsTrigger>
  </TabsList>
 </div>


{/* EUEE */}
  <TabsContent value="EUEE">
  <div className="flex justify-center p-4 py-20 md:py-10">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {examsYears.map((year,index)=>{
          return <YearExamCard key={index} year={year} url={`/EUEE/${params.subject}/${year}?`}/>
         })}
         
          
        </div>
      </div>
  </TabsContent>




{/* model */}
  <TabsContent value="model">
  <div className="flex justify-center p-4 py-20">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {examsYears.map((year,index)=>{
          return <YearExamCard key={index} year={year} url={`/EUEE/${params.subject}/${year}/model?`}/>
         })}
         
          
        </div>
      </div>
  </TabsContent>

 
</Tabs>


     

    </div></>
    
  )
}

export default ExamSubjectPage