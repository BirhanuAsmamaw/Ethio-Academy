import { Suspense } from "react";
import SearchClient from "./searchClient";
import Spinning from "@/components/spinning";
import Navbar from "@/components/navbar/Navbar";


const SearchPage =async () => {
  return (<>
  <Navbar/>
  <Suspense fallback={<div 
  className="h-screen w-full flex justify-center items-center  gap-1 text-xl">
    <Spinning/>
    <p>Searching...</p>
  </div>}>
    <SearchClient/>
    </Suspense> </>);
}
 
export default SearchPage;