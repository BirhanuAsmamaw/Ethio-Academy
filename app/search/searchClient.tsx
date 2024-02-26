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

  return <div className="">
    {courses.map((course) =>{
      return <div key={course.id}>{course.subject}</div>
    })}
  </div>;
};

export default SearchClient;
