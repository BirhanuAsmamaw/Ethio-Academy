import Card from '@/components/card/card'

import Hero from '@/components/hero/hero'
import Navbar from '@/components/navbar/Navbar'
import React from "react";

import Header from '@/components/Header'
import { getCourses } from '@/actions/courses/getCourses';
import { getAllExamsCategory } from '@/actions/examsCategory/getAllExamsCategry';
import ExamsCategoryCard from '@/components/card/examscategoryCard';
import { getBanner } from '@/actions/banner/getbanner';
import PaginationComponent from '@/components/pagination';
import { getNewCourses } from '@/actions/courses/getNewcourses';
import CourseList from '@/components/lists/courseList';
import FAQComponent from '@/components/faq';
import AboutComponent from '@/components/about/about';
import ServicesComponent from '@/components/services/service';
import DevicesComponent from '@/components/devices/devices';
import FilteredCourse from '@/app/search/filteredCourse';
import CourseListClientComponent from '@/components/lists/courseListClient';







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

    <main className="w-full pt-10  space-y-6 md:space-y-20 overflow-x-hidden">
    <Hero banner={banner}/>
   
   <CourseListClientComponent/>

   





    {/* 
EXAMS CATEGORY */}
  <div className="flex  justify-center w-full pt-10">
    <div className="w-full lg:w-11/12 xl:px-20   space-y-4">

<h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double p-2 dark:text-gray-300 border-gray-200 dark:border-gray-700 pl-4'>Exams</h1>

<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center flex-wrap gap-4 p-4 md:px-10'>
       {examsCategory?.map((exam)=>{
        return <ExamsCategoryCard key={exam.id} name={exam.examType} 
        url={`/exams/${exam.url} `}
        image={exam.cover?.public_url}/>
       })}

      </div>
      </div>
</div>




<AboutComponent/>

<ServicesComponent/>
{/* FAQ */}
<FAQComponent/>

<DevicesComponent/>
    
    </main>

  
  
  
  
   </>
  )
}
