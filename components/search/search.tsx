import { CiSearch } from "react-icons/ci";

const Search = () => {
  return ( 
    <div className="flex w-full md:w-md border rounded-[8px] border-gray-200 overflow-hidden ">
    <CiSearch size={30} className="pt-1"/> <input type="search" className="w-full border-none outline-none px-2 py-1"/>
   </div>
     );
}
 
export default Search;