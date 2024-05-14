
import Hero from '@/components/hero/hero'
import Navbar from '@/components/navbar/Navbar'
import React from "react";

import Header from '@/components/Header'
import { getAllExamsCategory } from '@/actions/examsCategory/getAllExamsCategry';
import ExamsCategoryCard from '@/components/card/examscategoryCard';
import { getBanner } from '@/actions/banner/getbanner';
import FAQComponent from '@/components/faq';
import AboutComponent from '@/components/about/about';
import ServicesComponent from '@/components/services/service';
import DevicesComponent from '@/components/devices/devices';
import CourseListLayout from '@/components/lists/courseListLayout';
import InstructorsList from '@/components/lists/instructorsList';










export default async function Home({
  searchParams,
}: {
  searchParams?:{ [key: string]: string | undefined };
}) {

 

const examsCategory=await getAllExamsCategory();
const banner=await getBanner();


  return (<>
   <Header
    title='Ethio Exams Academy'
    description='Unlock Your Potential with Ethio Exams Academy - Where Learning Meets Success!'
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>


   

    
    
    <Navbar/>

    <main className="w-full  p-0 overflow-x-hidden">
    <Hero banner={banner}/>
   
   <CourseListLayout/>

   





    {/* 
EXAMS CATEGORY */}
<section id='exams' className='w-full bg-amber-50  py-20 md:py-32   relative  dark:bg-slate-800 '>
  <div className="flex   justify-center  py-10">
    <div className="w-full lg:w-11/12 xl:px-20   space-y-4">

<h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double p-2 border-gray-200 dark:border-gray-700  text-gray-800 dark:text-gray-100 tracking-tight !leading-tight'>Exams</h1>

<div className='grid  grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center flex-wrap gap-4 p-4 md:px-10'>
       {examsCategory?.map((exam)=>{
        return <ExamsCategoryCard key={exam.id} name={exam.examType} 
        url={`/exams/${exam.url} `}
        image={exam.cover?.public_url}/>
       })}

      </div>
      </div>
    
</div>

</section>

<InstructorsList/>




<AboutComponent/>

<ServicesComponent/>
{/* FAQ */}
<FAQComponent/>

<DevicesComponent/>
    
    </main>

  
  
  
  
   </>
  )
}
