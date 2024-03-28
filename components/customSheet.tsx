"use client"

import { ReactNode, useState } from "react";

interface CustomeSheetProps{
 children:ReactNode;
 selectedLabel:ReactNode;
 unselectedLabel:ReactNode;
}

const CustomeSheet:React.FC<CustomeSheetProps>= ({children,selectedLabel,unselectedLabel}) => {
 
   const [isOpen,setOpen]=useState(false)

 
  
  
 const onOpen = () => {
  setOpen((prev)=>!prev)
 };

  
    return (
      


<div className="">
  <button onClick={onOpen} className="pt-2 no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium"> 
  {isOpen? <>{selectedLabel}</>:<>{unselectedLabel}</>}
  </button>
  <div className={`fixed  right-0  h-full bg-white dark:bg-gray-800 shadow-xl top-10 z-50 ${!isOpen?'bg-opacity-0 translate-x-[100%]':'w-[80%] bg-opacity-100 translate-x-0'} transition duration-300 ease-in-out`}>
      <div className="  pt-10 w-full space-y-4 overflow-y-auto">
      
      {children}
   

      </div>
    </div>
  <div onClick={onOpen} className={`fixed right-0 left-0 w-full h-screen z-0 bg-black bg-opacity-20 ${!isOpen&&'hidden'}`}>
    
  </div>
</div>


    
   );
}
 
export default CustomeSheet;