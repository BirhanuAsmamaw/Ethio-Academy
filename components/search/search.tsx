import { CiSearch } from "react-icons/ci";

const Search = () => {
  return ( <>
    <div className="hidden md:block  ">
   <div className="flex w-full md:w-md bg-white dark:bg-gray-700  border rounded-[8px] border-gray-200 dark:border-gray-800 overflow-hidden ">
     <CiSearch size={30} className="pt-1"/> 
     <input type="search" className="bg-white dark:bg-gray-700  w-full border-none outline-none px-2 py-1"/></div>
   </div>
   <div className="md:hidden relative">
    <button><CiSearch size={30} className=""/></button>
    <div className="absolute top-13 w-full">
    <div className=" dark:border-gray-800 bg-white dark:bg-gray-700  shadow-lg flex w-[300px]  border rounded-[8px] border-gray-200 overflow-hidden ">
    <CiSearch size={30} className="pt-1"/> 
    <input type="search" 
    className=" bg-white dark:bg-gray-700  w-full border-none outline-none px-2 py-1"/>
   </div>
    </div>
   </div>
   </>
     );
}
 
export default Search;