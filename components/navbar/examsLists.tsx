"use client"
import React from 'react'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu'
import CLink from '../link'
interface ExamsListsProps{
  exams:any[]|null
}
const ExamsLists:React.FC<ExamsListsProps> = ({exams}) => {
  const hoverLink='link decoration-none relative pb-1 hover:dark:text-green-400 hover:text-blue-500 hover:font-medium before:bg-yellow-400  '
  return (<NavigationMenu className='w-full'>
    <NavigationMenuList className='w-full'>
      <NavigationMenuItem className='w-full'>
        <NavigationMenuTrigger className={`p-2  mt-2 no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400
       hover:text-rose-400 transition bg-transparent duration-300 font-medium ${hoverLink}`}>Exams</NavigationMenuTrigger>
        <NavigationMenuContent className='space-y-2 p-2'>
        {exams?.map((c,index)=>{
            return <CLink key={index} url={`/exams/${c.url}`} >
                
                <p className="w-[300px]">{c.examType}</p>
  
            
           </CLink>
                  
         
          })}
        </NavigationMenuContent>
        </NavigationMenuItem>
        </NavigationMenuList>
        </NavigationMenu>
  )
}

export default ExamsLists