"use client"

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";


const SearchPage = () => {

  const searchParam=useSearchParams();
const searchQueryData=searchParam? searchParam.get("q"):null;

  return (<Suspense fallback={<div>Loading...</div>}>
<div className="">
<h1>search Data</h1>
</div>
  </Suspense> );
}
 
export default SearchPage;