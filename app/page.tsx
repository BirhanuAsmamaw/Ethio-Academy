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
   
   

   {/* Courses */}
    <div id="courseslist" className=" min-h-screen flex flex-col gap-10 overflow-hidden">


    {(courses?.courses?.length||0)?<div  id='common-courselist' className="flex justify-center w-full">
    <div className="w-full lg:w-11/12 xl:px-20 space-y-4">
      <h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double  p-2 dark:text-gray-300 border-gray-200 dark:border-gray-700 pl-4'>Most common Courses</h1>
  
     <CourseList>
     {courses?.courses?.map((course)=>{
          return course.cover&&<Card
          key={course.id}
              id={course.id}
              no_reviews={course.reviews.length}
              url={course.subject.department.url}
              category={course.subject.department.departmentName}
              price={course.price}
              subject={course.course}
              rating={course?.rating??0}
              cover={course.cover.public_url} 
              subjectCat={course?.subject.subjectName}
              instructorName={course?.instructor?.accountName?course?.instructor?.accountName:course?.instructor?.user.name || ""}
              instructorTitle={course?.instructor?.title||""}
              logo={course?.instructor?.logo? course?.instructor?.logo:course.instructor?.user.image||null}
              instructorId={course?.instructorId}
               />
      
        })}
     </CourseList>
      {(courses?.count||0)>4?<div className="w-full flex p-4 justify-end">
        <PaginationComponent paginationLength={courses?.count||0} page={searchParams?.page||'1'} pageUrl='page'id='common-courselist'/>
      </div>:""}
</div>
</div>:""}




   {(courses?.courses?.length||0) ?<div id="newcourseslist" className="flex justify-center w-full ">
    <div className="w-full lg:w-11/12 space-y-4 xl:px-20">
    <h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double p-2 dark:text-gray-300 border-gray-200 dark:border-gray-700 pl-4'>New Coming  Courses</h1>
   
      <CourseList>

        {newCourses?.courses?.map((course,index)=>{
          return course.cover&&<Card
          key={index}
              id={course.id}
              no_reviews={course.reviews.length}
              url={course.subject.department.url}
              category={course.subject.department.departmentName}
              price={course.price}
              subject={course.course}
              rating={course?.rating??0}
              cover={course.cover?.public_url}  
              instructorName={course?.instructor?.accountName?course?.instructor?.accountName:course?.instructor?.user.name || ""}
              instructorTitle={course?.instructor?.title||""}
              logo={course?.instructor?.logo? course?.instructor?.logo:course.instructor?.user.image||null}
              subjectCat={course?.subject.subjectName}
              instructorId={course?.instructorId}
              />
      
        })}

</CourseList>
      {(newCourses?.count||0)>4?<div className="w-full flex p-4 justify-end">
        <PaginationComponent paginationLength={newCourses?.count||0} page={searchParams?.newpage||'1'} pageUrl='newpage' id='newcourseslist'/>
      </div>:""}
    </div>
   </div>:""}

    </div>







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
    
    </main>

  
  
  
  
   </>
  )
}
