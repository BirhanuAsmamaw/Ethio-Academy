import { CiSearch } from "react-icons/ci";

const Search = () => {
  return ( <>
    <div className="hidden md:block  ">
   <div className="flex w-full  bg-white dark:bg-gray-800  border rounded-[8px] border-gray-200 dark:border-gray-700 overflow-hidden ">
     <CiSearch size={30} className="pt-1"/> 
     <input type="search" className="bg-white dark:bg-gray-800  w-full border-none outline-none px-2 py-1"/></div>
   </div>
   <div className="md:hidden relative">
    <button><CiSearch size={26} className="pt-1 text-gray-500 dark:text-gray-400"/></button>
    <div className="absolute top-13 w-[300px] right-2 ">
    <div className=" dark:border-gray-700 bg-white dark:bg-gray-800  shadow-lg flex w-full  border rounded-[8px] border-gray-200 overflow-hidden ">
    <CiSearch size={30} className="pt-1"/> 
    <input type="search" 
    className=" bg-white dark:bg-gray-800  w-full border-none outline-none px-2 py-1"/>
   </div>
    </div>
   </div>
   </>
     );
}
 
export default Search;