"use client"
import React from 'react'
import FilterCourseCard from '../../components/card/filterCourseCard'
import PaginationComponent from '../../components/pagination'


interface FilteredCourseProps{
  courses:any[];
  pagination:any;
  onPageChange: (page: number) => void;
}
const FilteredCourse:React.FC<FilteredCourseProps> = ({courses,pagination,onPageChange}) => {
  


  return (<div className="pt-20 col-span-6">
         <div className="  space-y-6">
         {courses?.map((course:any)=>{
      
        return course.cover&&<FilterCourseCard
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

         </div>
         <div className="w-full flex justify-end p-4 lg:p-10">
    
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
         </div>
   
  )
}

export default FilteredCourse