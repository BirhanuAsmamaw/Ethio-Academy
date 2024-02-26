"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const Search = () => {

  const router=useRouter();

  const [searchQuery,setSearchQuery] = useState("");

  const onSearchSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    const encodedSearch=encodeURI(searchQuery)
    router.push(`/search?q=${encodedSearch}`)

  };
  return ( <>
    <div className="hidden md:block w-full ">
   <form onSubmit={onSearchSubmit} className="flex w-full  bg-white dark:bg-gray-800  border rounded-[8px] border-gray-200 dark:border-gray-700 overflow-hidden ">
     <CiSearch size={30} className="pt-1"/> 
     <input value={searchQuery} onChange={(event)=>setSearchQuery(event.target.value)} type="search" className="bg-white dark:bg-gray-800  w-full border-none outline-none px-2 py-1"/></form>
   </div>
   <div className="md:hidden relative">
    <button><CiSearch size={30} className="pt-2 text-gray-500 dark:text-gray-400"/></button>
    <div className="absolute top-13 w-[300px] left-4 right-4 ">
    <form onSubmit={onSearchSubmit} className=" dark:border-gray-700 bg-white dark:bg-gray-800  shadow-lg flex w-full  border rounded-[8px] border-gray-200 overflow-hidden ">
    <CiSearch size={30} className="pt-1"/> 
    <input value={searchQuery} onChange={(event)=>setSearchQuery(event.target.value)} type="search" 
    className=" bg-white dark:bg-gray-800  w-full border-none outline-none px-2 py-1"/>
   </form>
    </div>
   </div>
   </>
     );
}
 
export default Search;