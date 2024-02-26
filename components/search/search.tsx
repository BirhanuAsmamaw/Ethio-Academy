"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const Search = () => {

  const router=useRouter();

  const [searchQuery,setSearchQuery] = useState<string|null>(null);

  
  return ( <>
    <div className="hidden md:block w-full relative ">
   <div  className="flex w-full  bg-white dark:bg-gray-800  border rounded-[8px] border-gray-200 dark:border-gray-700 overflow-hidden ">
     <CiSearch size={30} className="pt-1"/> 
     <input onChange={(event)=>setSearchQuery(event.target.value)} type="search" className="focus:shadow-md bg-white dark:bg-gray-800  w-full border-none outline-none px-2 py-1"/>
     </div>
     <div className="absolute top-13 w-full ">
      <div className="flex flex-col w-full gap-2">
        <p className="text-xs">Biology Grade 12</p>
        <p className="text-xs">Biology Grade 12</p>
        <p className="text-xs">Biology Grade 12</p>
        <p className="text-xs">Biology Grade 12</p>
        <p className="text-xs">Biology Grade 12</p>
        <p className="text-xs">Biology Grade 12</p>
      </div>
     </div>
   </div>
   <div className="md:hidden  bg-blue-600 relative w-full">
    <button><CiSearch size={30} className="pt-2 text-gray-500 dark:text-gray-400"/></button>
    <div className="absolute top-16 w-[400px] left-2 right-10 ">
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