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
import FilteredCourse from '@/components/lists/filteredCourse';
import CourseListClientComponent from '@/components/lists/courseListClient';







export default async function Home({
  searchParams,
}: {
  searchParams?:{ [key: string]: string | undefined };
}) {

 

const courses=await getCourses(Number(searchParams?.page||'1'))
const newCourses=await getNewCourses(Number(searchParams?.newpage||'1'))
const examsCategory=await getAllExamsCategory();
const banner=await getBanner();


  return (<>
   <Header
    title='Ethio Exams Academy'
    description='Unlock Your Potential with Ethio Exams Academy - Where Learning Meets Success!'
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>


   
   <div className=" fixed bg-blue-200 dark:bg-slate-600 blur-3xl top-[100px] -right-4 h-40 rounded-full  w-40"></div>
    <div className=" fixed bg-blue-200 dark:bg-slate-600 blur-3xl top-[100px] -left-4 h-40 rounded-full  w-40"></div>
    <div className=" fixed bg-blue-200 dark:bg-slate-600 blur-3xl top-[50%] left-[50%] h-40 rounded-full  w-40"></div>
    <div className=" fixed bg-blue-200 dark:bg-slate-600 blur-3xl bottom-0 -left-4 h-20  rounded-full  w-40"></div>
    <div className=" fixed bg-blue-200 dark:bg-slate-600 blur-3xl bottom-0  -right-4  h-40 rounded-full  w-40"></div>
    
    
    <Navbar/>

    <main className="w-full space-y-6 md:space-y-20">
    <Hero banner={banner}/>
   
   <CourseListClientComponent/>
<FilteredCourse/>
   





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
