"use client"

import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { CiLogin,CiLogout  } from "react-icons/ci";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdOutlineDashboard } from "react-icons/md";
import Link from "next/link";
import CustomeSheet from "../customSheet";
import CLink from "../link";
import CSheet from "./CSheet";
import { useFilteredCourseBySubjectQuery } from "@/redux/features/course/courseApi";
import { useEffect, useState } from "react";
import TableSkeleton from "../tableSkeleton";
import { TbArrowNarrowRight } from "react-icons/tb";
import { usePathname } from "next/navigation";
import CreateInstructorLink from "../createInstructorLink";

 

interface MobileSidebarProps{
  user:any;
  exams:any[]|null;
  departments:any[] |null;
}

const MobileSidebar:React.FC<MobileSidebarProps>= ({user,departments,exams}) => {
  const [subjectId,setSubjectId]=useState("")
  const [isMounted, setIsMounted] = useState(false);
  const {data,isError,isLoading,isSuccess,refetch}=useFilteredCourseBySubjectQuery(subjectId);
  const pathName=usePathname();
  useEffect(() => {
    // Set isMounted to true once the component is mounted
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Fetch data when subjectId changes
    if (subjectId) {
      refetch();
    }
  }, [subjectId]);

  if (!isMounted) {
    // If component is not yet mounted, return null
    return null;
  }
 
    return (
     

<CustomeSheet selectedLabel={<IoMdClose size={24}/>} unselectedLabel={<IoIosMenu size={24}/>}>
<>
      <div className="space-y-2 ">
      

      {/* // Category */}
      <CSheet className="mt-10" label="Category">
          {departments?.map((department,index)=>{
            return <CSheet key={index}
             className="border-b text-[14px] pb-1" 
             url={`/category/${department.url}`}
             label={department.departmentName}>
              {
                department.subject.map((subject:any,sub:number)=>{
                  return <div onClick={()=>setSubjectId(subject.id)}   key={sub} className="">
                    <CSheet 
                    className="border-b text-[14px] pb-1" 
                    url={`/category/${department.url}/${subject.id}`} 
                    label={subject.subjectName}>
                    {isSuccess&&(data.length?data.map((course:any)=>{
    return <CLink url={`/course/${course.id}`}>
      <p className="hover:text-rose-500 border-b text-[14px] pb-1 hover:dark:text-green-400 w-full">{course.course}</p>
    </CLink>
   }
  ):<span>No Courses!</span>)}
  {isLoading&&<TableSkeleton/>}
  {isError&&<span>Error Occurred!</span>}
                    </CSheet>
                  </div>
                })
              }
            </CSheet>
          })}
        
      </CSheet>
      

      {/* // Exams */}
      <CSheet label="Exams">
      {exams?.map((c:any,index:number)=>{
            return <Link key={index} href={`/exams/${c.url}`} className="px-2 divide-y divide-slate-300 dark:divide-gray-600 py-1 text-sm flex no-underline  gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            {c.examType}
           </Link>
          })}
        
        </CSheet>
 
  
 
        <div className="space-y-2  px-2">

    <hr className="border-gray-100 dark:border-gray-600"/>
    <CLink url="/#courseslist"><p className="pl-2">Courses</p></CLink>
    <CLink url="/#contact"><p className="pl-2">Contact</p></CLink>
       <CLink url="/#service"><p className="pl-2">Services</p></CLink>
       <CLink url="/#about" ><p className="pl-2">About</p></CLink>
        </div>
      </div>

      

      <div className="space-y-2 p-2">
      <hr className="border-gray-100 dark:border-gray-600"/>
      
         {!user&&<Link href="/register"  className={`px-2 py-1 hover:dark:text-green-400
       hover:text-rose-400 font-medium shadow-sm border-2 border-blue-600 shadow-blue-600 gap-2 hover:scale-105 no-underline hover:bg-blue-700 hover:font-medium  items-center leading-6  rounded-full text-center text-white flex  justify-center bg-blue-600 transition-all duration-300 
${pathName==="/register"&&'text-blue-600 dark:text-green-400 font-semibold'} `}>
 <SiGnuprivacyguard className="pt-1" size={20}/>
  <span className=" truncate">Sign up</span>
  <TbArrowNarrowRight size={20}/>
   </Link>}

   <hr className="border-gray-100 dark:border-gray-600"/>
         {!user&&<><Link href="/login" className={`text-sm flex no-underline  gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200
         ${pathName==="/register"&&'text-blue-600 dark:text-green-400 font-semibold'}
         `}>
          <CiLogin className="pt-1" size={20}/> <p>Login</p>
         </Link>
         <hr className="border-gray-100 dark:border-gray-600"/>
         </>}

         

         {user&&(user.role==='ADMIN')&&<Link href="/dashboard" className="text-sm flex no-underline  gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <MdOutlineDashboard className="pt-1" size={20}/> <p>Dashboard</p>
         </Link>}
         {user&&<Link href="/logout" className="text-sm flex no-underline  gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <CiLogout className="pt-1" size={20}/> <p>Logout</p>
         </Link>}
         {!user?.teacher?<div className="mt-6">
          <CreateInstructorLink/>
         </div>:""
         

         }
      </div>
        
        

      </>
</CustomeSheet>
    
   );
}
 
export default MobileSidebar;