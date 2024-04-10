

import { getCoursesBySubject } from "@/actions/courses/getCoursesBySubject";
import { getNewCoursesBySubject } from "@/actions/courses/getNewCoursesBySubject";
import { getDepartmentByCode } from "@/actions/departments/getDepartmentByCode";
import { getSubjectById } from "@/actions/subject/getSubjectById";
import Banner from "@/components/banner";
import Card from "@/components/card/card";

import Navbar from "@/components/navbar/Navbar";
import PaginationComponent from "@/components/pagination";
import Spinning from "@/components/spinning";



interface IPrams{
  category: string;
  subjectId: string;
}
const Category =async ({params,searchParams}:{params:IPrams,searchParams?:{ [key: string]: string | undefined }}) => {
  

  
  const department = await getDepartmentByCode(params.category);
  const subject = await getSubjectById(params.subjectId);
  const selectedCourses=await getCoursesBySubject(params.category,params.subjectId);
  const newSelectedCourses=await getNewCoursesBySubject(params.category,params.subjectId)
  if(!selectedCourses){
    return <div className="w-full h-screen flex justify-center items-center">
      <Spinning/>
    </div>
  }
  return (<><Navbar/> <div className="flex pb-20">
<div className="flex flex-col gap-10 w-full items-center">



<div className="p-4 md:p-6 lg:p-10 xl:p-20 w-full">
     <Banner title={`${department?.departmentName} Courses`}>
      <h6 className="text-lg font-semibold">{subject?.subjectName}</h6>
     </Banner>
     </div>

   

   {/* Courses */}
   <div id="courseslist" className=" min-h-screen flex flex-col gap-10 overflow-hidden">


<div className="flex justify-center w-full">
<div className="w-full lg:w-11/12 xl:px-20 space-y-4">
  <h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double  p-2 dark:text-gray-300 border-gray-200 dark:border-gray-700 pl-4'>Most common Courses</h1>

  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center flex-wrap gap-4 p-4 md:px-10'>

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
  <div className="w-full flex p-4 justify-end">
    <PaginationComponent paginationLength={selectedCourses.length||0} page={searchParams?.page||'1'} pageUrl='page'/>
  </div>
</div>
</div>




<div className="flex justify-center w-full ">
<div className="w-full lg:w-11/12 space-y-4 xl:px-20">
<h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double p-2 dark:text-gray-300 border-gray-200 dark:border-gray-700 pl-4'>New Coming  Courses</h1>
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center flex-wrap gap-4 p-4 md:px-10'>

    {newSelectedCourses?.map((course,index)=>{
      return course.cover&&<Card
      key={index}
          id={course.id}
          url={course.subject.department.url}
          category={course.subject.department.departmentName}
          price={course.price}
          subject={course.course}
          rating={course?.rating??0}
          cover={course.cover?.public_url}  />
  
    })}


  </div>
  <div className="w-full flex p-4 justify-end">
    <PaginationComponent paginationLength={ newSelectedCourses?.length||0} page={searchParams?.newpage||'1'} pageUrl='newpage'/>
  </div>
</div>
</div>

</div>

</div>
  </div> </> );
}
 
export default Category;