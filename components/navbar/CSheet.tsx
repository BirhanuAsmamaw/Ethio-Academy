 "use client"
import { cn } from '@/lib/utils';
import React, { ReactNode, useState } from 'react'
import { MdOutlineArrowBackIos } from "react-icons/md";
import { IoChevronForward } from "react-icons/io5";
import Link from 'next/link';
const CSheet = ({className,url,children,label, onClick}:{
  onClick?:()=>void,
  className?:string,
  label:string,
  url?:string
  children:ReactNode
}) => {
  const [isOpen,setOpen]=useState(false)
  

  
  return (<div className=" overflow-x-hidden ">
  {!isOpen?<button 
  onClick={()=>{
    onClick
    setOpen((prev)=>!prev)
  }}  className={cn(
    "w-full flex justify-between text-sm  text-left  items-center px-4 hover:no-underline gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200",
    className
  )}>
    <span 
  className=" text-left" 
  >{label}</span>
  <IoChevronForward size={20}/>
  </button>:""}

 <div className={`h-screen overflow-y-auto custom-scrollbar overflow-x-hidden absolute top-0 w-full   bg-white dark:bg-gray-800 ${isOpen?' opacity-100 translate-x-0 bg-gray-800 ':' translate-x-full opacity-0 right-0 left-0'} transition-all duration-300`}>

  <div className="flex gap-2 px-2 py-4 bg-gray-50 dark:bg-gray-700 w-full text-sm  tracking-tight font-medium text-gray-700 dark:text-gray-300"> 
  <button 
  className="hover:text-black text-blue-600 hover:underline no-underline dark:text-green-400 hover:dark:text-white"
  onClick={()=>setOpen((prev)=>!prev)}>
    <MdOutlineArrowBackIos  size={18}/> </button> 
    
    <Link href={url||"#"} className='text-blue-600 hover:underline no-underline dark:text-green-400 '>{label}</Link>
    </div>
  <div className={`space-y-2 overflow-y-auto custom-scrollbar h-full p-2 pt-4 `}>
    {children}
  </div>
 </div>
  </div>
  )
}

export default CSheet