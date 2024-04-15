
"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react'



interface CLinkProps{
  children:ReactNode;
  url:string;
 

}
const CLink:React.FC<CLinkProps> = ({children,url}) => {
  const pathName = usePathname()
 
  return ( 
     <Link href={url} className={`
  flex no-underline  text-md gap-2
  
   hover:scale-y-105
    transition
     duration-300
${
  pathName===url?'text-[#4C6FFF]':' text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
}

  `}>

{children}

 </Link>
 
  )
}

export default CLink