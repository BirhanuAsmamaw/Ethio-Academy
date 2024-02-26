
"use client"

import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const searchData=useSearchParams();
  
  return ( <div className="">
    <h1>search page</h1>
  </div> );
}
 
export default SearchPage;