
import { getDepartmentByCode } from "@/actions/departments/getDepartmentByCode";
import Banner from "@/components/banner";
import Navbar from "@/components/navbar/Navbar";
import DepartmentOrderByRateCoursesList from "./orderByRateCourseFlitered";
import DepartmentNewCoursesList from "./newCourseFlitered";
import Header from "@/components/Header";



interface IPrams{
  category: string;
}
const Category =async ({params}:{params:IPrams}) => {

  const department = await getDepartmentByCode(params.category);

  
  return (<>
  <Navbar/> 
  <Header
  keywords='EthioAcademy,top courses, best course category, [specific department] courses, most popular courses, comprehensive learning'
  description={`Discover the best course category in the ${department?.departmentName || ""} department. Explore top-rated courses designed to enhance your skills and knowledge, with expert instructors and comprehensive materials.`}
  title={`${department?.departmentName || ""} Courses | Enhance Your Skills Today`}
/>

  <div className="flex p-2 pb-20 w-full">
<div className="flex flex-col w-full  gap-10  items-center">



<div className="p-4 md:p-6 lg:p-10  md:mt-10 xl:p-20 w-full">
     <Banner title={`${department?.departmentName} Courses`}>
        
    <></>
     </Banner>
     </div>

   

   {/* Courses */}
   <div id="courseCategory" className="mt-10 md:mt-2 min-h-screen flex justify-center items-center flex-col w-full gap-10 overflow-hidden">

<DepartmentOrderByRateCoursesList department={department}/>
<DepartmentNewCoursesList department={department}/>


</div>
  </div>
  </div>
  </>
   );
}
 
export default Category;