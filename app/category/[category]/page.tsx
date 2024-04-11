
import { getCoursesByDepartment } from "@/actions/courses/getCoursesByDepartment";
import { getNewCoursesByDepartment } from "@/actions/courses/getNewCoursesByDepartment";
import { getDepartmentByCode } from "@/actions/departments/getDepartmentByCode";
import Banner from "@/components/banner";
import Card from "@/components/card/card";
import SubjectCard from "@/components/card/subjectCard";

import Navbar from "@/components/navbar/Navbar";
import PaginationComponent from "@/components/pagination";
import Spinning from "@/components/spinning";



interface IPrams{
  category: string;
}
const Category =async ({params,searchParams}:{params:IPrams,searchParams?:{ [key: string]: string | undefined }}) => {

  const department = await getDepartmentByCode(params.category);
  const selectedCourses=await getCoursesByDepartment(params.category)
  const  newSelectedCourses=await getNewCoursesByDepartment(params.category)
  if(!selectedCourses){
    return <div className="w-full h-screen flex justify-center items-center">
      <Spinning/>
    </div>
  }
  return (<><Navbar/> <div className="flex p-2 pb-20 w-full">
<div className="flex flex-col gap-10 w-full items-center">



<div className="p-4 md:p-6 lg:p-10 xl:p-20 w-full">
     <Banner title={`${department?.departmentName} Courses`}>
        
    <></>
     </Banner>
     </div>

   

   {/* Courses */}
   <div id="courseCategory" className=" min-h-screen flex flex-col w-full gap-10 overflow-hidden">


{selectedCourses.length?<div className="flex justify-center w-full">
<div className="w-full lg:w-11/12  space-y-4">
  <h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double  p-2 dark:text-gray-300 border-gray-200 dark:border-gray-700 pl-4'>Most common Courses</h1>

  <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center flex-wrap gap-4 p-4 md:px-10'>

    {selectedCourses?.map((course)=>{
      return course.cover&&<Card
      key={course.id}
          id={course.id}
          no_reviews={course.reviews.length}
          url={course.subject.department.url}
          category={course.subject.department.departmentName}
          price={course.price}
          subject={course.course}
          rating={course?.rating??0}
          cover={course.cover.public_url} 
           />
  
    })}


  </div>
  {selectedCourses?.length>4?<div className="w-full flex p-4 justify-end">
    <PaginationComponent paginationLength={selectedCourses?.length||0} page={searchParams?.page||'1'} pageUrl='page'/>
  </div>:""}
</div>
</div>:""}




{newSelectedCourses?.length?<div className="flex justify-center w-full ">
<div className="w-full lg:w-11/12 space-y-4 ">
<h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double p-2 dark:text-gray-300 border-gray-200 dark:border-gray-700 pl-4'>New Coming  Courses</h1>
<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center flex-wrap gap-4 p-4 md:px-10'>

    {newSelectedCourses?.map((course,index)=>{
      return course.cover&&<Card
      key={index}
          id={course.id}
          no_reviews={course.reviews.length}
          url={course.subject.department.url}
          category={course.subject.department.departmentName}
          price={course.price}
          subject={course.course}
          rating={course?.rating??0}
          cover={course.cover?.public_url}  />
  
    })}


  </div>
  {newSelectedCourses?.length>4?<div className="w-full flex p-4 justify-end">
    <PaginationComponent paginationLength={newSelectedCourses?.length||0} page={searchParams?.newpage||'1'} pageUrl='newpage'/>
  </div>:""}

  
</div>
</div>:""}

</div>



{department?.subject?.length?<div className="flex mt-10  justify-center w-full ">
<div className="w-full lg:w-11/12 space-y-4 xl:px-20 ">
<h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double p-2 dark:text-gray-300 border-gray-200 dark:border-gray-700 pl-4'> {department?.departmentName} Courses</h1>
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center flex-wrap gap-4 p-4 md:px-10'>

    {department?.subject?.map((subject,index)=>{
      return subject.cover&&<SubjectCard
      key={index}
         
          url={`/category/${department.url}/${subject.id}`}
          name={subject.subjectName}
         image={subject.cover?.public_url}  
         
         />
  
    })}


  </div>
  {(newSelectedCourses?.length||0>4)?<div className="w-full flex p-4 justify-end">
    <PaginationComponent paginationLength={newSelectedCourses?.length||0} page={searchParams?.newpage||'1'} pageUrl='newpage'/>
  </div>:""}
</div>
</div>:""}

</div>
  </div> </> );
}
 
export default Category;