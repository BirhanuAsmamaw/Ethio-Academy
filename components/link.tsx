
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
  flex no-underline  
  text-sm
  gap-2
   w-full
   hover:scale-y-105
    transition
     duration-300
${
  pathName===url?'text-[#4C6FFF] dark:text-green-400 font-medium':'font-normal text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
}

  `}>

{children}

 </Link>
 
  )
}

export default CLink