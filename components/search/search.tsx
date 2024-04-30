"use client"


import { IoIosSearch, IoMdClose } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "@/redux/features/search/searchSlice";
import { RooState } from "@/redux/store";
import { useRouter } from "next/navigation";


const Search= () => {
const router=useRouter();
 const dispatch=useDispatch();
  const [isSearchOpen,setSearchOpen] =useState(false);
  const [searchQuery,setSearchQuery] = useState<string|null>(null);
  const searchData=useSelector((state:RooState)=>state.search.search);

  useEffect(()=>{
    if(searchData){
      router.push("/search")
    }
   
  },[searchData])

   useEffect(()=>{
    dispatch(setSearch({search:searchQuery}))
   },[dispatch, searchQuery])

const onSearchOpen=()=>{
  setSearchOpen((prev)=>!prev)
}
  
  return ( <>
    <div className="hidden xl:block w-full relative ">
    <div className='flex w-full gap-2
    dark:bg-gray-800
    focus-within:dark:border-green-400
    hover:dark:bg-gray-700
    dark:border-gray-600
    hover:bg-slate-100
    hover:dark:border-green-400
    focus-within:dark:shadow-green-400
     bg-slate-50 
     border-slate-300 border-2 focus-within:shadow
      focus-within:shadow-blue-400
     focus-within:border-blue-400 rounded-full outline-2 
      focus-within:scale-x-105
      transition-all
       duration-300

     '>
       <div className="py-2 pl-4">
       <IoIosSearch size={24} className='text-slate-400'/>
       </div>
        <input
         type="search"
         defaultValue={searchData}
        onChange={(event)=>setSearchQuery(event.target.value)}
        placeholder='Search...'
         className='w-full rounded-full border-none focus:outline-none   p-2 bg-transparent'/>
    </div>

  
   
   </div>
   <div className="xl:hidden   w-full">
    <button onClick={onSearchOpen} className="pt-2 no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium" >
    {isSearchOpen? <IoMdClose size={24}/>:<IoIosSearch size={24}/>}
    </button>
    <div className={`absolute  z-20 mt-1 top-13 w-11/12 p-3 left-2 right-2 ${!isSearchOpen?'bg-opacity-0 -translate-y-[200%]':'bg-opacity-100 translate-y-0'} transition duration-300`}>
    <div  className='flex w-full gap-2
    dark:bg-gray-800
    hover:dark:bg-gray-700
    dark:border-gray-600
    hover:bg-slate-100
    hover:dark:border-green-400
    focus-within:dark:shadow-green-400
     bg-slate-50 
     border-slate-300 border-2 focus-within:shadow
      focus-within:shadow-blue-400
     focus-within:border-blue-400 
     focus-within:dark:border-green-400
     rounded-full outline-2 
      focus-within:scale-x-105
      transition-all
       duration-300

     '>
       <div className="py-2 pl-4">
       <IoIosSearch size={24} className='text-slate-400'/>
       </div>
        <input
        type="search"
        defaultValue={searchData}
        onChange={(event)=>setSearchQuery(event.target.value)}
        placeholder='Search...'
         className='w-full rounded-full border-none focus:outline-none   p-2 bg-transparent'/>
    </div>
    </div>
   </div>
   </>
     );
}
 
export default Search;