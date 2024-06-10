import React from "react";
import { IconType } from "react-icons";


 interface DashboardCardProbs{
  label: string;
  content: string;
  icon: IconType;
  className?:string;
 }
const DashboardCard :React.FC<DashboardCardProbs>= ({label,content,icon:Icon,className}) => {
  return ( 
    <div  className={`block min-w-sm max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${className}`}>
    
  <div className="flex justify-around gap-4">
    <div className=""><Icon size={40}/></div>
    <div className="">
    <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white"> {content}</h5>
    <p className="font-medium text-2xl text-gray-700 dark:text-gray-400">{label}</p>
    </div>
  </div>
    </div>
     );
}
 
export default DashboardCard;