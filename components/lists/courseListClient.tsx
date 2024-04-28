"use client"
import { RooState } from '@/redux/store';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FilteredCourse from './filteredCourse';
import CourseListLayout from './courseListLayout';

const CourseListClientComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);// Initialize page to 1
  const searchData = useSelector((state: RooState) => state.search.search);
  const [courses, setCourses] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    axios.get(`/api/course/lists?page=${currentPage}&search=${searchData}`).then((response) => {
      setCourses(response.data.courses);
      setPagination(response.data.pagination);
    }).catch((error) => {
      console.log("error", error);
    });
  }, [currentPage, searchData]);
  
  // Include searchData in the dependency array

  return (<div>
    {searchData?<FilteredCourse
     courses={courses} 
     pagination={pagination} 
     onPageChange={handlePageChange}
    />:<CourseListLayout 
    courses={courses} 
    pagination={pagination} 
    onPageChange={handlePageChange}/>}
  </div>
  )
}

export default CourseListClientComponent
