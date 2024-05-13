import React, { useState } from 'react';
import CourseList from './courseList';
import Card from '../card/card';
import PaginationComponent from '../pagination';
import { useNewCourseQuery} from '@/redux/features/course/courseApi';
import CardSceleton from '../card/cardSceleton';

const NewCoursesList = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4);

  const { data, isSuccess,isLoading } = useNewCourseQuery({ page: page.toString(), pageSize: pageSize.toString() });
 

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (<div id="newcourseslist" className="flex justify-center w-full ">
          <div className="w-full lg:w-11/12 space-y-4 xl:px-20">
            <h1 className='w-full tracking-tight  !leading-tight text-xl text-gray-800 dark:text-gray-100 md:text-4xl font-semibold border-b-2 border-double p-2  border-gray-200 dark:border-gray-700 pl-4'>New Coming Courses</h1>
      
            <div className="space-y-10">
              <CourseList>
              {isSuccess&&data.courses.map((course: any, index: number) => {
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
                    instructorName={course?.instructor?.accountName || course?.instructor?.user.name || ""}
                    instructorTitle={course?.instructor?.title || ""}
                    logo={course?.instructor?.logo || course.instructor?.user.image || null}
                    subjectCat={course?.subject.subjectName}
                    instructorId={course?.instructorId}
                  />
                );
              })}
              {isLoading&&<>
              <CardSceleton/>
              <CardSceleton/>
              <CardSceleton/>
              <CardSceleton/>
              </>}
            </CourseList>

            {data&&data?.pagination && (
              <PaginationComponent
                currentPage={data.pagination.currentPage}
                totalPages={data.pagination.totalPages}
                hasNextPage={data.pagination.hasNextPage}
                hasPreviousPage={data.pagination.hasPreviousPage}
                onPageChange={onPageChange}
              />
            )}
            </div>
          </div>
        </div>
      
  );
};

export default NewCoursesList;
