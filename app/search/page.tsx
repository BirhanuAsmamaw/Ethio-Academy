import { Suspense } from "react";
import SearchClient from "./searchClient";
import Spinning from "@/components/spinning";


const SearchPage =async () => {
  return (<Suspense fallback={<div className="h-screen w-full flex justify-center items-center flex gap-1 text-xl">
    <Spinning/>
    <p>Searching...</p>
  </div>}><SearchClient/></Suspense> );
}
 
export default SearchPage;