"use client"
import Card from '@/components/card/card';
import CardSceleton from '@/components/card/cardSceleton';
import CourseList from '@/components/lists/courseList';
import NoCourseFound from '@/components/notification/noCourseFound';
import PaginationComponent from '@/components/pagination';
import { useNewCourseFilterByDepartmentQuery } from '@/redux/features/course/courseApi';
import React, { useState } from 'react';


const DepartmentNewCoursesList = ({department}:{department:any}) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4);
 

  const { data, isSuccess,isLoading } = useNewCourseFilterByDepartmentQuery({ page: page.toString(), pageSize: pageSize.toString(),departmentId:department.id });
 

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (<div  className="flex justify-center w-full ">
          <div className="w-full lg:w-11/12 space-y-4 xl:px-20">
            <h1 className='w-full tracking-tight  !leading-tight text-xl text-gray-800 dark:text-gray-100 md:text-4xl font-semibold border-b-2 border-double p-2  border-gray-200 dark:border-gray-700 pl-4'>New Coming Courses</h1>
      
            <div className="space-y-10">
             <CourseList>
              {isSuccess?<>{data&&data.courses.length?data.courses.map((course: any, index: number) => {
                return course.cover && (
                  <Card
                    key={index}
                    id={course.id}
                    no_reviews={course.reviews.length}
                    price={course.price}
                    subject={course.course}
                    rating={course?.rating ?? 0}
                    cover={course.cover?.public_url}  
                    instructorName={course?.instructor?.accountName || course?.instructor?.user.name || ""}
                    instructorTitle={course?.instructor?.title || ""}
                    logo={course?.instructor?.logo || course.instructor?.user.image || null}
                    subjectCat={course?.subject.subjectName}
                    subjectCatId={course?.subject.id}
                    instructorId={course?.instructorId}
                  />
                );
              }):<NoCourseFound title={department.departmentName}/>}</>:""
            }
              {isLoading&&<>
              <CardSceleton/>
              <CardSceleton/>
              <CardSceleton/>
              <CardSceleton/>
              
              </>}
            </CourseList>

            {data&&data.courses.length&&data?.pagination ?(
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

export default DepartmentNewCoursesList;
