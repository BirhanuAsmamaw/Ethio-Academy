"use client"

import { CourseType } from "@/types";
import Link from "next/link";

import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
interface SearchProps{
  courses:CourseType[] | any[];
}
const Search:React.FC<SearchProps> = ({courses}) => {

  

  const [searchQuery,setSearchQuery] = useState<string|null>(null);

  const filteredcourse=courses.filter((course)=>course.subject.includes(searchQuery||''))

  
  return ( <>
    <div className="hidden md:block w-full relative ">
   <div  className="flex w-full  bg-white dark:bg-gray-800  border rounded-[8px] border-gray-200 dark:border-gray-700 overflow-hidden ">
     <CiSearch size={30} className="pt-1"/> 
     <input onChange={(event)=>setSearchQuery(event.target.value)} type="search" className="focus:shadow-md bg-white dark:bg-gray-800  w-full border-none outline-none px-2 py-1"/>
     </div>
     <div className={`absolute top-13
      w-full bg-white
       dark:bg-gray-800 
      shadow-xl
       rounded-b-[10px]
      shadow-gray-100
      ${!searchQuery&&'hidden'}
      `}>

      <div className="flex flex-col w-full gap-2 p-2">
     {
      filteredcourse.map((c) =>{
        return <Link key={c.id} href={`/course/${c.id}`} className="no-underline p-1 hover:bg-gray-100  hover:dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition ">
          {c.subject}
          </Link>
      })
     }
     </div>
   </div>
   </div>
   <div className="md:hidden   w-full">
    <button><CiSearch size={30} className="pt-2 text-gray-500 dark:text-gray-400"/></button>
    <div className="absolute top-13 w-full left-2 right-2 bg-rose-350">
    <div  className=" dark:border-gray-700 bg-white dark:bg-gray-800  shadow-lg flex w-full  border rounded-[8px] border-gray-200 overflow-hidden ">
    <CiSearch size={30} className="pt-1"/> 
    <input  onChange={(event)=>setSearchQuery(event.target.value)} type="search" 
    className=" bg-white dark:bg-gray-800  w-full border-none outline-none px-2 py-1"/>
   </div>
    </div>
   </div>
   </>
     );
}
 
export default Search;