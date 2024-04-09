"use client"
import Card from "@/components/card/card";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchClient = () => {
  const searchParam = useSearchParams();
  const searchQueryData = searchParam?.get("q");
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/course/coursesearch?subject=${searchQueryData}`);
        // Assuming the data you want is in response.data, modify accordingly
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error appropriately (e.g., show an error message)
      }
    };

    if (searchQueryData) {
      fetchData();
    }
  }, [searchQueryData]);

  return <div className="min-h-screen w-full flex justify-center items-center">
       <div className="w-full md:w-10/12  xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 justify-center">
        {courses.map((course) =>{
          return course.cover&&<Card
          key={course.id}
              id={course.id}
              no_reviews={course.reviews.length}
              url={course?.subject?.department.url}
              category={course?.subject?.department.departmentName}
              price={course.price}
              subject={course.course}
              rating={course?.rating??0}
              cover={course.cover?.public_url}
               />
        })}
       </div>
  </div>;
};

export default SearchClient;
