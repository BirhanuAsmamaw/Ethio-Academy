"use client"
import FilterCardSceleton from '@/components/card/filterCardSceleton';
import FilteredCourse from '@/app/search/filteredCourse';
import Spinning from '@/components/spinning';
import { RooState } from '@/redux/store';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FilteredBar from './filteredBar';


 // Correct the import path

const SearchClient = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const FilterData = useSelector((state: RooState) => state.search); // Use RootState instead of RooState
  const [courses, setCourses] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
 

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    const fetchData = async () => {
      const searchUrl=`${FilterData.search?`&search=${FilterData.search}`:''}${FilterData.rating?`&rating=${FilterData.rating}`:''}${FilterData.price?`&price=${FilterData.price}`:''}`
      try {
        const response = await axios.get(`/api/course/lists?page=${currentPage}`+searchUrl);
        setCourses(response.data.courses);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, FilterData.price,FilterData.search,FilterData.rating]);
 

  return (<div className=" py-20">
    <div className=' z-30 grid grid-cols-12 gap-10 w-full'>
      
    <FilteredBar/>


    {courses.length?<FilteredCourse
          courses={courses}
          pagination={pagination}
          onPageChange={handlePageChange}
        />:<div className="col-span-6 py-10 lg:py-20 flex w-full justify-center ">
        <div className=" col-span-6 space-y-6 relative">
          <div className="absolute z-20 h-full w-full flex justify-center items-center">
            <Spinning/>
          </div>
        <FilterCardSceleton/>
        <FilterCardSceleton/>
        <FilterCardSceleton/>
        </div>
      </div>}
         </div>
       
         
       </div>
     
  );
};

export default SearchClient;
