import { ReactNode } from "react";

const SubLayout = ({children}:{children:ReactNode}) => {
  return (    <div className="w-full md:w-11/12 lg:w-7/12 xl:w-7/12 2xl:w-6/12 2xl:mr-20 border-x-2 border-double p-4 bg-white dark:bg-gray-800 dark:border-gray-700 border-gray-300   flex flex-col gap-6">
{children}
  </div> );
}
 
export default SubLayout;