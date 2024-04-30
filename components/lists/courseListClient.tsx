"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CourseListLayout from './courseListLayout';
import CourseList from './courseList';
import CardSceleton from '../card/cardSceleton';


const CourseListClientComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);// Initialize page to 1
  const [courses, setCourses] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    axios.get(`/api/course/lists?page=${currentPage}`).then((response) => {
      setCourses(response.data.courses);
      setPagination(response.data.pagination);
    }).catch((error) => {
      console.log("error", error);
    });
  }, [currentPage]);
  
  // Include searchData in the dependency array

  if(!courses.length){
    return ( <div className='relative w-full p-10  flex justify-center'>
      
      <CourseList>
      <><CardSceleton/>
      <CardSceleton/>
      <CardSceleton/>
      <CardSceleton/>
      </>
    </CourseList>
    </div>)
  }
  return (<CourseListLayout 
    courses={courses} 
    pagination={pagination} 
    onPageChange={handlePageChange}/>
  )
}

export default CourseListClientComponent
