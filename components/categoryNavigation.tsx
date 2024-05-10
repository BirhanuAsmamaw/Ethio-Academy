"use client"
import {  ChevronDown, ChevronRight} from 'lucide-react'
import React, { useEffect, useState } from 'react'

import CLink from './link'
import { useFilteredCourseBySubjectQuery } from '@/redux/features/course/courseApi'
import TableSkeleton from './tableSkeleton'



interface CategoryNavigationProps{
  departments:any[]|null
}
const CategoryNavigation:React.FC<CategoryNavigationProps> = ({departments}) => {
  const [subjectId,setSubjectId]=useState("")
  const [isMounted, setIsMounted] = useState(false);

 
  const {data,isError,isLoading,isSuccess,refetch}=useFilteredCourseBySubjectQuery(subjectId);
 

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
  return (<div className="relative group">
    <button className="px-2 flex gap-2"><p className=''>category</p> <ChevronDown className='h-4 mt-1  w-4 group-hover:rotate-180 transition duration-300'/></button>
    <div className="absolute  z-50 transform -translate-y-[200%] transition duration-300 group-hover:translate-y-0 pt-8 -left-16">
  <div className="bg-white scroll-y-auto p-2 dark:bg-black relative w-[300px] h-full border shadow-md  rounded-md">
  <div className="h-10 ">
   <div className="left-0 right-0 fixed  z-20 flex gap-2 border-b-2 overflow-x-hidden">
      <input type="search"  className='p-2 z-20 w-full outline-none  border-none' placeholder='search...'/></div>
   </div>
    <div className='mt-4 space-y-2'>
     
     
      
       
          {departments?departments?.map((department:any)=>{
            return <CLink  key={department.id} url={`/category/${department.url}`} >
          <div className="w-full flex justify-between group/subject">
          <span className='group-hover/subject:dark:text-yellow-400 group-hover/subject:text-rose-500'>{department.departmentName}</span>
          
          
          <ChevronRight className="mr-2 h-4 w-4 group-hover/subject:dark:text-yellow-400 group-hover/subject:text-rose-500 group-hover/subject:-rotate-90 transition duration-300"/>
     
          <div className="absolute hidden group-hover/subject:block z-50 left-full p-2 ">
          <div className="bg-white scroll-y-auto p-2 dark:bg-black relative w-[300px] h-full border shadow-md  rounded-md">
  <div className="w-full flex gap-2 border-b-2 overflow-x-hidden">
   
      <input type="search"  className='p-2 z-20 w-full outline-none  border-none' placeholder='search...'/></div>
  
    <div className='mt-4 space-y-2'>
     
     
      
       
          {department.subject?.length?department.subject?.map((sub:any)=>{
            return <CLink  key={sub.id} url={`/category/${department.url}/${sub.id}`} >
          <div onMouseEnter={()=>setSubjectId(sub.id)} className="w-full flex justify-between group/course">
          <span className='group-hover/course:dark:text-yellow-400 group-hover/course:text-rose-500'>{sub?.subjectName}</span>
          
          
          <ChevronRight className="mr-2 h-4 w-4 group-hover/course:dark:text-yellow-400 group-hover/course:text-rose-500 group-hover/course:-rotate-90 transition duration-300"/>
     
          <div className="absolute hidden group-hover/course:block z-50 left-full p-2 ">
            <div className="bg-white scroll-y-auto p-2 dark:bg-black relative w-[300px] h-full border shadow-md  rounded-md">
            <div className="w-full flex gap-2 border-b-2 overflow-x-hidden">
   
   <input type="search"  className='p-2 z-20 w-full outline-none  border-none' placeholder='search...'/>
   </div>

   <div className='mt-4 space-y-2'>
   {isSuccess&&(data.length?data.map((course:any)=>{
    return <CLink url={`/course/${course.id}`}>
      <p className="hover:text-rose-500 hover:dark:text-yellow-400 w-full">{course.course}</p>
    </CLink>
   }
  ):<span>No Courses!</span>)}
  {isLoading&&<TableSkeleton/>}
  {isError&&<span>Errpr Occured!</span>}
   </div>
            
            </div>
          </div>
          </div>
          
          </CLink>
         
           
          }):<span>No Subjects!</span>}
    
        
    </div>
  </div>
          </div>
          </div>
          
          </CLink>
         
           
          }):""}
    
        
    </div>
  </div>
    </div>
  </div>
         
  )
}

export default CategoryNavigation