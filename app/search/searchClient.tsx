"use client"

import { useSearchParams } from "next/navigation";

const SearchClient = () => {

  const searchParam=useSearchParams();
  const searchQueryData=searchParam?.get("q")
  return (<div className="">{searchQueryData}</div>  );
}
 
export default SearchClient;