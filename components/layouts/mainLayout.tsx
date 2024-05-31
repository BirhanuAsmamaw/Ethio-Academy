import { ReactNode } from "react";

const MainLayout = ({children}:{children:ReactNode}) => {
  return (    <div className="flex relative  mx-auto justify-center  lg:justify-start  lg:px-20 2xl:px-0 2xl:justify-center w-full min-h-screen py-10">
    {children}
  </div>);
}
 
export default MainLayout;