import { ReactNode } from "react";
interface SubLayoutProps{
  className?: string;
  children:ReactNode;
}
const SubLayout:React.FC<SubLayoutProps> = ({children ,className}) => {
  return (    <div className={`w-full md:w-11/12 lg:w-7/12 xl:w-7/12 2xl:w-6/12 2xl:mr-20 border-x-2 border-double p-4    flex flex-col gap-6
  ${className}
  `}>
{children}
  </div> );
}
 
export default SubLayout;