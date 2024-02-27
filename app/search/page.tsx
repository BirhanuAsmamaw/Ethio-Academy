import { Suspense } from "react";
import SearchClient from "./searchClient";


const SearchPage =async () => {
  return (<Suspense fallback={<div className="h-screen w-full flex justify-center items-center text-2xl">Loading...</div>}><SearchClient/></Suspense> );
}
 
export default SearchPage;