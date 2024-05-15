

import { getCoursesBySubject } from "@/actions/courses/getCoursesBySubject";
import { getDepartmentByCode } from "@/actions/departments/getDepartmentByCode";
import { getSubjectById } from "@/actions/subject/getSubjectById";
import Banner from "@/components/banner";
import Navbar from "@/components/navbar/Navbar";
import Spinning from "@/components/spinning";
import Link from "next/link";
import SubjectOrderByRateCoursesList from "./orderByRateCourseFlitered";
import SubjectNewCoursesList from "./newCourseFlitered";



interface IPrams{
 
  subjectId: string;
}
const Category =async ({params}:{params:IPrams}) => {
  

  

  const subject = await getSubjectById(params.subjectId);
  
  return (<><Navbar/> <div className="flex pb-20">
<div className="flex flex-col gap-10 w-full items-center">



<div className="p-4 md:p-6 lg:p-10 xl:p-20 w-full">
     <Banner title={`${subject?.subjectName} Courses`}>
   
    <div className="flex justify-center md:justify-end   w-full">
    <Link href={`/category/${subject?.department?.url}`} className=" text-[20px] drop-shadow-lg pb-6 pr-6 text-gray-100 font-sans no-underline hover:underline transition-all duration-300 ">{subject?.department?.departmentName} </Link>
    </div>
  
     </Banner>
     </div>

   

     {/* Courses */}
     <div id="coursesubject" className=" min-h-screen flex flex-col w-full gap-10 overflow-hidden">

<SubjectOrderByRateCoursesList subjectId={subject?.id||""}/>
<SubjectNewCoursesList subjectId={subject?.id||""}/>
</div>

</div>
  </div> </> );
}
 
export default Category;