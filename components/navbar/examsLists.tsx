"use client"
import React from 'react'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu'
import CLink from '../link'
import { ChevronDown } from 'lucide-react'
interface ExamsListsProps{
  exams:any[]|null
}
const ExamsLists:React.FC<ExamsListsProps> = ({exams}) => {
  const hoverLink='link decoration-none relative pb-1 hover:dark:text-green-400 hover:text-blue-500 hover:font-medium before:bg-yellow-400  '
  return (<div className="relative hidden  xl:block  group">
    <button  className={`px-2 flex gap-2  no-underline text-gray-500 dark:text-gray-400  group-hover:dark:text-green-400
    
       group-hover:text-rose-400 transition duration-300 font-medium ${hoverLink}`}><p >Exams</p> <ChevronDown className='h-4 mt-1  w-4 group-hover:rotate-180 transition duration-300'/></button>
    <div className="absolute  z-50 transform opacity-0 -translate-y-[200%] transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 pt-8 -left-16">
  <div className="bg-white scroll-y-auto p-2 dark:bg-black relative w-[300px] h-full border shadow-md  rounded-md">
  
    <div className='mt-4 space-y-2'>
     
     
    {exams?.map((c,index)=>{
            return <CLink key={index} url={`/exams/${c.url}`} >
                
                <p className=" hover:text-rose-500 hover:dark:text-green-400 w-[300px]">{c.examType}</p>
  
            
           </CLink>
                  
         
          })}
       
         
    
        
    </div>
  </div>
    </div>
  </div>
 
  )
}

export default ExamsLists