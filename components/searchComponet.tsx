import React from 'react'
import { IoIosSearch } from "react-icons/io";
interface SearchComponentProps{
    onChange:(e: any) => void;
}
const SearchComponent = () => {
  return (
    <div className='flex w-full gap-2 bg-slate-100 
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
        placeholder='Search...'
         className='w-full rounded-full border-none focus:outline-none   p-2 bg-transparent'/>
    </div>
  )
}

export default SearchComponent