import Card from '@/components/card/card'

import Hero from '@/components/hero/hero'
import Navbar from '@/components/navbar/Navbar'
import React from "react";

import Header from '@/components/Header'
import { getCourses } from '@/actions/getCourses'
import { BackgroundBeams } from '@/components/ui/background-beams';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AboutAcademy } from '@/lib/aboutAcademy';




export default async function Home() {

const courses=await getCourses()

  return (
    <>
    <Header
    title='Alpha Online Academy'
    description='Empowering Minds, Shaping Futures: Unlock your potential with Alpha, the pinnacle of online education. As the premier academy, we offer a transformative learning experience that goes beyond traditional boundaries. Our meticulously crafted courses cover a spectrum of subjects, including programming, high school courses, freshman essentials, entrance exams preparation, and expert guidance for exit exams. At Alpha, we believe in nurturing excellence and fostering a community of lifelong learners. Join us on a journey of academic excellence and personal growth.'
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>

   <div className="flex flex-col overflow-hidden">
   <div className=" fixed bg-blue-200 dark:bg-slate-600 blur-3xl top-[100px] -right-4 h-40 rounded-full  w-40"></div>
    <div className=" fixed bg-blue-200 dark:bg-slate-600 blur-3xl top-[100px] -left-4 h-40 rounded-full  w-40"></div>
    <div className=" fixed bg-blue-200 dark:bg-slate-600 blur-3xl top-[50%] left-[50%] h-40 rounded-full  w-40"></div>
    <div className=" fixed bg-blue-200 dark:bg-slate-600 blur-3xl bottom-0 -left-4 h-20 h-40 rounded-full  w-40"></div>
    <div className=" fixed bg-blue-200 dark:bg-slate-600 blur-3xl bottom-0  -right-4  h-40 rounded-full  w-40"></div>
    
    <BackgroundBeams />
    <Navbar/>
    <Hero/>
   
    <main className='md:flex md:justify-center w-full pb-10 overflow-hidden'>
    <div id="courseslist" className="flex flex-col gap-10 overflow-hidden">
      <h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double  p-2 dark:text-gray-300 border-gray-200 dark:border-gray-700 pl-4'>Most common Courses</h1>

  
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center flex-wrap gap-8 p-4 md:px-10'>

        {courses?.map((course:any)=>{
          return <Card
          key={course.id}
              id={course.id}
              no_reviews={course.reviews.length}
              category={course.category}
              price={course.price}
              subject={course.subject}
              rating={course?.rating}
              cover={course.cover} 
               />
      
        })}


      </div>

     



    <h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double p-2 dark:text-gray-300 border-gray-200 dark:border-gray-700 pl-4'>New Coming  Courses</h1>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center flex-wrap gap-8 p-4 md:px-10'>

        {courses?.map((course,index)=>{
          return <Card
          key={index}
              id={course.id}
              category={course.category}
              price={course.price}
              subject={course.subject}
              rating={course?.rating??0}
              cover={course.cover}  />
      
        })}


      </div>






      <div className="py-20 flex justify-center w-full">
<div className="w-full md:w-11/12 lg:w-8/12 xl:w-6/12 flex flex-col gap-4">
<h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double  p-2 dark:text-gray-300 border-gray-200 dark:border-gray-700 pl-4'>What to expect from Ethio Exams Academy courses</h1>


<Accordion type="single" collapsible className="w-full p-1 " >

      {AboutAcademy.map((about:any,index:number) =>{
        return <AccordionItem key={index} value={`${index}`}className="border bg-white dark:bg-gray-800  border-slate-200 dark:border-gray-600 px-2 md:px-6 m-2 rounded-[6px] ">
        <AccordionTrigger className="hover:no-underline" ><div className="flex gap-2  text-captalize  ">
         <p className="h-5 w-5 rounded-full bg-green-400  items-center text-center text-sm text-black">{index+1}</p>
         <p className="text-base">{about.title}</p>
          </div></AccordionTrigger>
        <AccordionContent className="bg-background">
          <p className='text-sm text-wrap'>{about.content}</p>
        </AccordionContent>
      </AccordionItem>
      })}


     
      
    </Accordion>

</div>
     
      </div>
      








    </div>

   </main>
  
   </div></>
  )
}
