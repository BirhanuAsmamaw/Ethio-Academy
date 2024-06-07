"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoMdAdd } from 'react-icons/io'
import {motion} from "framer-motion"
import { RiSubtractFill } from "react-icons/ri";

interface AddButtonProps{
  onAddButton?:() => void
  label: string
  isAdd?:boolean;
  className?:string;

}
const AddButton:React.FC<AddButtonProps> = ({onAddButton,className,isAdd,label}) => {
  const router=useRouter();
 
  return (<motion.button 
    
    initial={{scale: 1}}
    whileHover={{scale:1.1}}
    whileTap={{scale:1}}
    transition={{duration:0.25}}
    onClick={onAddButton}
    className={`py-2 md:py-2.5 px-3 md:px-5 me-2 mb-2
text-sm font-medium text-gray-900 focus:outline-none
 bg-white rounded-full border border-gray-200 
 hover:bg-gray-100 hover:text-blue-700 focus:z-10 
 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700
  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
   dark:hover:text-white dark:hover:bg-gray-700 flex gap-2 items-center justify-center ${className}`}>
    {isAdd?(<RiSubtractFill size={24}/>):(<IoMdAdd size={24}/>)} <p>{label}</p></motion.button>
  )
}

export default AddButton