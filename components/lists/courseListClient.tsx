
import { RooState } from '@/redux/store';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const CourseListClientComponent = () => {
  const [page, setPage] = useState(1); // Initialize page to 1
  const searchData = useSelector((state: RooState) => state.search.search);

  useEffect(() => {
    axios.get(`/api/course/lists?page=${page}&search=${searchData}`).then((response) => {
      console.log("response Data:", response.data);
    }).catch((error) => {
      console.log("error", error);
    });
  }, [page, searchData]); // Include searchData in the dependency array

  return (
    <div>CourseListClientComponent</div>
  )
}

export default CourseListClientComponent
