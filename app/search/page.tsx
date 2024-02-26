import { Suspense } from "react";
import SearchClient from "./searchClient";

const SearchPage = () => {
  return (<Suspense><SearchClient/></Suspense> );
}
 
export default SearchPage;