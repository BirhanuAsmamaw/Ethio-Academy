"use client"
import Card from '@/components/card/card';
import CardSceleton from '@/components/card/cardSceleton';
import NoCourseFound from '@/components/notification/noCourseFound';
import PaginationComponent from '@/components/pagination';
import { useOrderCourseByRateFilterByInstructorQuery } from '@/redux/features/course/courseApi';


import React, { useState } from 'react';


const InstructorOrderByRateCoursesList = ({instructor}:{instructor:any}) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4);
 

  const { data, isSuccess,isLoading } = useOrderCourseByRateFilterByInstructorQuery({ page: page.toString(), pageSize: pageSize.toString(),instructorId:instructor.id });


  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (<div  className="flex justify-center w-full ">
          <div className="w-full ">
            <h1 className='w-full tracking-tight  !leading-tight text-xl text-gray-800 dark:text-gray-100 md:text-4xl font-semibold border-b-2 border-double p-2  border-gray-200 dark:border-gray-700 pl-4'>Most Common Courses</h1>
      
            <div className="space-y-10">
             <div 
              className="grid gap-6
   grid-cols-2 
   lg:grid-cols-3">
              {isSuccess&&<>{
                data&&data.courses.length?data.courses.map((course: any, index: number) => {
                  return course.cover && (
                    <Card
                      key={index}
                      id={course.id}
                      no_reviews={course.reviews.length}
                      url={course.subject.department.url}
                      category={course.subject.department.departmentName}
                      price={course.price}
                      subject={course.course}
                      rating={course?.rating ?? 0}
                      cover={course.cover?.public_url}  
                      subjectCatId={course?.subject.id}
                      subjectCat={course?.subject.subjectName}
                     
                    />
                  );
                }):<NoCourseFound title={instructor.accountName||instructor.user?.name}/>
              }</>}

              {isLoading&&<>
              <CardSceleton/>
              <CardSceleton/>
              <CardSceleton/>
              
              </>}
            </div>

            {isSuccess&&data&&data.courses.length&&data?.pagination ? (
              <PaginationComponent
                currentPage={data.pagination.currentPage}
                totalPages={data.pagination.totalPages}
                hasNextPage={data.pagination.hasNextPage}
                hasPreviousPage={data.pagination.hasPreviousPage}
                onPageChange={onPageChange}
              />
            ):""}
            </div>
          </div>
        </div>
      
  );
};

export default InstructorOrderByRateCoursesList;
