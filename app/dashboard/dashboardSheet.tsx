"use client"

import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { Sidebar } from "lucide-react";
 


const DashboardSheet= () => {
 
   const [isOpen,setOpen]=useState(false)
 
  
 const onOpen = () => {
  setOpen((prev)=>!prev)
 };

  
    return (
      


<div className="">
  <button onClick={onOpen} className="no-underline text-gray-500 bg-white dark:bg-gray-800 p-2 rounded-r-full border-r-2 dark:border-gray-700 dark:text-gray-400 font-medium  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium"> 
Dashboard
  </button>
  <div className={`fixed  left-0  h-screen  bg-white dark:bg-gray-800 shadow-xl top-14 z-50 ${!isOpen?'bg-opacity-0 -translate-x-[100%]':'w-[50%] md:w-[30%] bg-opacity-100 translate-x-0'} transition duration-300 ease-in-out`}>
    <div className="w-full flex justify-end px-4">
    <button onClick={onOpen} className="pt-2 no-underline text-gray-500 dark:text-gray-400 font-medium  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium">  <IoMdClose size={24}/>:</button>
    </div>
      <div className=" px-4 pt-6 w-full space-y-4">
     


        <Sidebar/>
        
        

      </div>
    </div>
  <div onClick={onOpen} className={`fixed right-0 left-0 w-full h-screen z-0 bg-black bg-opacity-20 ${!isOpen&&'hidden'}`}>
    
  </div>
</div>


    
   );
}
 
export default DashboardSheet;