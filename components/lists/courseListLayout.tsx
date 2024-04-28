"use client"
import React from 'react'
import CourseList from './courseList'

import Card from '../card/card';
import PaginationComponent from './pagination';
interface CourseListLayoutProps{
  courses:any[];
  pagination:any;
  onPageChange: (page: number) => void;
}
const CourseListLayout:React.FC<CourseListLayoutProps>= ({courses,pagination,onPageChange}) => {
  return ( <div id="courseslist" className=" min-h-screen flex flex-col gap-10 overflow-hidden">


  {(courses?.length||0)?<div  id='common-courselist' className="flex justify-center w-full">
  <div className="w-full lg:w-11/12 xl:px-20 space-y-4">
    <h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double  p-2 dark:text-gray-300 border-gray-200 dark:border-gray-700 pl-4'>Most common Courses</h1>

   <CourseList>
   {courses?.map((course:any)=>{
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

    {pagination && (
        <PaginationComponent
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          hasNextPage={pagination.hasNextPage}
          hasPreviousPage={pagination.hasPreviousPage}
          onPageChange={onPageChange}
        />
      )}
</div>
</div>:""}




 {(courses?.length||0) ?<div id="newcourseslist" className="flex justify-center w-full ">
  <div className="w-full lg:w-11/12 space-y-4 xl:px-20">
  <h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double p-2 dark:text-gray-300 border-gray-200 dark:border-gray-700 pl-4'>New Coming  Courses</h1>
 
    <CourseList>

      {courses?.map((course:any,index:number)=>{
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
   
  </div>
 </div>:""}

  </div>


  )
}

export default CourseListLayout;