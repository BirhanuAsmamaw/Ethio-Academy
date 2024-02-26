import { Suspense } from "react";
import SearchClient from "./searchClient";


const SearchPage =async () => {
  return (<Suspense fallback={<div>Loading...</div>}><SearchClient/></Suspense> );
}
 
export default SearchPage;