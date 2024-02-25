import { CiSearch } from "react-icons/ci";

const Search = () => {
  return ( <>
    <div className="hidden md:block flex w-full md:w-lg  border rounded-[8px] border-gray-200 overflow-hidden ">
    <CiSearch size={30} className="pt-1"/> <input type="search" className="w-full border-none outline-none px-2 py-1"/>
   </div>
   <div className="md:hidden relative">
    <button><CiSearch size={30} className=""/></button>
    <div className="absolute top-13 w-full">
    <div className=" shadow-lg flex w-full  border rounded-[8px] border-gray-200 overflow-hidden ">
    <CiSearch size={30} className="pt-1"/> <input type="search" className="w-full border-none outline-none px-2 py-1"/>
   </div>
    </div>
   </div>
   </>
     );
}
 
export default Search;