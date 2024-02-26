"use client"

import Link from "next/link";
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
     <div className="absolute top-13 w-full bg-white dark:bg-gray-800">
      <div className="flex flex-col w-full gap-2 p-2 shadow-xl rounded-b-[10px] shadow-gray-100">
      <div className="max-h-[400px] overflow-y-auto flex flex-col w-full gap-2 p-2 shadow-xl rounded-b-[10px] shadow-gray-100 dark:shadow-gray-900 ">
        <Link href="/" className="no-underline p-1 hover:bg-gray-100  hover:dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">Biology Grade 12</Link>
        <Link href="/" className="no-underline p-1 hover:bg-gray-100  hover:dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">Biology Grade 12</Link>
        <Link href="/" className="no-underline p-1 hover:bg-gray-100  hover:dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">Biology Grade 12</Link>
        <Link href="/" className="no-underline p-1 hover:bg-gray-100  hover:dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">Biology Grade 12</Link>
        <Link href="/" className="no-underline p-1 hover:bg-gray-100  hover:dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">Biology Grade 12</Link>
        <Link href="/" className="no-underline p-1 hover:bg-gray-100  hover:dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">Biology Grade 12</Link>
        <Link href="/" className="no-underline p-1 hover:bg-gray-100  hover:dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">Biology Grade 12</Link>
        <Link href="/" className="no-underline p-1 hover:bg-gray-100  hover:dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">Biology Grade 12</Link>
        <Link href="/" className="no-underline p-1 hover:bg-gray-100  hover:dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">Biology Grade 12</Link>
        <Link href="/" className="no-underline p-1 hover:bg-gray-100  hover:dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">Biology Grade 12</Link>
        <Link href="/" className="no-underline p-1 hover:bg-gray-100  hover:dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">Biology Grade 12</Link>
        <Link href="/" className="no-underline p-1 hover:bg-gray-100  hover:dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">Biology Grade 12</Link>
      </div>
     </div>
   </div>
   <div className="md:hidden   w-full">
    <button><CiSearch size={30} className="pt-2 text-gray-500 dark:text-gray-400"/></button>
    <div className="absolute top-16 w-[300px] left-2 right-2 bg-rose-350">
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