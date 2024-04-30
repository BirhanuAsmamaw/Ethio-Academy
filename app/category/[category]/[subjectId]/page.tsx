

import { getCoursesBySubject } from "@/actions/courses/getCoursesBySubject";
import { getNewCoursesBySubject } from "@/actions/courses/getNewCoursesBySubject";
import { getDepartmentByCode } from "@/actions/departments/getDepartmentByCode";
import { getSubjectById } from "@/actions/subject/getSubjectById";
import Banner from "@/components/banner";
import Card from "@/components/card/card";

import Navbar from "@/components/navbar/Navbar";
import PaginationComponent from "@/components/pagination";
import Spinning from "@/components/spinning";
import Link from "next/link";



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
     <Banner title={`${subject?.subjectName} Courses`}>
    <div className="flex justify-center w-full text-xl md:text-2xl  xl:text-3xl font-semibold ">
    [<Link href={`/category/${department?.url}`} className=" drop-shadow-lg  font-sans no-underline hover:underline transition-all duration-300 ">{department?.departmentName} </Link>]
    </div>
     </Banner>
     </div>

   

     {/* Courses */}
     <div id="coursesubject" className=" min-h-screen flex flex-col w-full gap-10 overflow-hidden">


{selectedCourses.length?<div className="flex justify-center w-full">
<div className="w-full lg:w-11/12  space-y-4">
  <h1 className='w-full text-xl md:text-3xl font-semibold border-b-2 border-double  p-2 dark:text-gray-300 border-gray-200 dark:border-gray-700 pl-4'>
    Most common 
     <span className="text-blue-500 dark:text-green-400"> {subject?.subjectName} </span> 
     Courses</h1>

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
          subjectCat={course?.subject.subjectName}
          instructorId={course?.instructorId}
          instructorName={course?.instructor?.accountName?course?.instructor?.accountName:course?.instructor?.user.name || ""}
          instructorTitle={course?.instructor?.title||""}
          logo={course?.instructor?.logo? course?.instructor?.logo:course.instructor?.user.image||null}
           />
  
    })}


  </div>
  {/* {selectedCourses?.length>4?<div className="w-full flex p-4 justify-end">
    <PaginationComponent paginationLength={selectedCourses?.length||0} page={searchParams?.page||'1'} pageUrl='page'/>
  </div>:""} */}
</div>
</div>:""}




{newSelectedCourses?.length?<div className="flex justify-center w-full ">
<div className="w-full lg:w-11/12 space-y-4 ">
<h1 className='w-full text-xl md:text-3xl font-semibold border-b-2 border-double p-2 dark:text-gray-300 border-gray-200 dark:border-gray-700 pl-4'>New Coming <span className="text-blue-500 dark:text-green-400">{subject?.subjectName}</span>  Courses</h1>
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
          cover={course.cover?.public_url} 
          subjectCat={course?.subject.subjectName}
          instructorId={course?.instructorId}
          instructorName={course?.instructor?.accountName?course?.instructor?.accountName:course?.instructor?.user.name || ""}
          instructorTitle={course?.instructor?.title||""}
          logo={course?.instructor?.logo? course?.instructor?.logo:course.instructor?.user.image||null} />
  
    })}


  </div>
  {/* {newSelectedCourses?.length>4?<div className="w-full flex p-4 justify-end">
    <PaginationComponent paginationLength={newSelectedCourses?.length||0} page={searchParams?.newpage||'1'} pageUrl='newpage'/>
  </div>:""} */}

  
</div>
</div>:""}

</div>

</div>
  </div> </> );
}
 
export default Category;