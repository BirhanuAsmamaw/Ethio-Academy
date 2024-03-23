

import Link from 'next/link';
import React from 'react'
import { IconType } from 'react-icons';
interface ActionButtonProps{
  label:string;
  icon:IconType;
  url:string;
}
const ActionButton:React.FC<ActionButtonProps> = ({label,url,icon:Icon}) => {
  return (<Link  href={url} className="py-2 md:py-2.5 px-3 md:px-5 me-2 mb-2
  text-sm font-medium text-gray-900 focus:outline-none
   bg-white rounded-full border border-gray-200 
   no-underline
   hover:bg-gray-100 hover:text-blue-700 focus:z-10 
   focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700
    dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
     dark:hover:text-white dark:hover:bg-gray-700 flex gap-2 items-center justify-center"><Icon size={24}/> <p>{label}</p></Link>
  )
}

export default ActionButton