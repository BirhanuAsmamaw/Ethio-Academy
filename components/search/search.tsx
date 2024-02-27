"use client"

import { CourseType } from "@/types";
import Link from "next/link";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
interface SearchProps{
  courses:CourseType[] | any[];
}
const Search:React.FC<SearchProps> = ({courses}) => {

  const router=useRouter();
  const [isSearchOpen,setSearchOpen] =useState(false);
  const [searchQuery,setSearchQuery] = useState<string|null>(null);
  const encodedSearchQuery=encodeURIComponent(searchQuery||"");
  const onHandleSubmit = (event:React.FormEvent)=>{
    event.preventDefault();
     
    router.push(`/search?q=${encodedSearchQuery}`);

  }
const onSearchOpen=()=>{
  setSearchOpen((prev)=>!prev)
}
  
  return ( <>
    <div className="hidden md:block w-full relative ">
   <form onSubmit={onHandleSubmit}  className="flex w-full  bg-white dark:bg-gray-800  border rounded-[8px] border-gray-200 dark:border-gray-700 overflow-hidden ">
     <CiSearch size={30} className="pt-1"/> 
     <input value={searchQuery||''} onChange={(event)=>setSearchQuery(event.target.value)} type="search" className="focus:shadow-md bg-white dark:bg-gray-800  w-full border-none outline-none px-2 py-1"/>
     </form>
   
   </div>
   <div className="md:hidden   w-full">
    <button onClick={onSearchOpen} className="pt-2 no-underline text-gray-500 dark:text-gray-400 font-medium  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium" >
    {isSearchOpen? <IoMdClose size={24}/>:<IoIosSearch size={24}/>}
    </button>
    <div className={`absolute  z-20 mt-1 top-13 w-11/12 p-3 left-2 right-2 ${!isSearchOpen?'bg-opacity-0 -translate-y-[200%]':'bg-opacity-100 translate-y-0'} transition duration-300`}>
    <form className=" dark:border-gray-700 bg-white dark:bg-gray-800  shadow-lg flex w-full  border rounded-[8px] border-gray-200 overflow-hidden ">
    <CiSearch size={30} className="pt-1"/> 
    <input onSubmit={onHandleSubmit}  onChange={(event)=>setSearchQuery(event.target.value)} type="search" 
    className=" bg-white dark:bg-gray-800  w-full border-none outline-none px-2 py-1"/>
   </form>
    </div>
   </div>
   </>
     );
}
 
export default Search;