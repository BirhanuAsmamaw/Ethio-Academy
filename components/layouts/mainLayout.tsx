import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MainLayout = ({children,className}:{className?:string,children:ReactNode}) => {
  return (    <div className={cn("flex relative  mx-auto justify-center  lg:justify-start  22xl:justify-center w-full min-h-screen py-10",className)}>
    {children}
  </div>);
}
 
export default MainLayout;