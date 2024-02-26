"use client"

import { useSearchParams } from "next/navigation";

const SearchClient = () => {

  const searchParam=useSearchParams();
  return (  <div className="">
  <h1>search page</h1>
</div> );
}
 
export default SearchClient;