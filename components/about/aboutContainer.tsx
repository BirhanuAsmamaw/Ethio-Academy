"use client"
import React from 'react'
import {motion} from "framer-motion"
interface AboutContainerProps{
    className:string,
    title:string,
    children:React.ReactNode
}
const AboutContainer:React.FC<AboutContainerProps> = ({children,className,title}) => {
  
  return (<motion.div 
    initial={{opacity:0,y:15}}
    whileInView={{opacity:1,y:0}}
    transition={{delay:0.15,duration:0.5}}
     className={`text-gray-900 dark:text-gray-300   space-y-4 shadow-md p-2 md:p-4 rounded-[10px] ${className}`}>
  <h1 className='text-lg md:text-2xl font-semibold  tracking-tight !leading-tight'>{title}</h1>
  {children}
</motion.div>
  )
}

export default AboutContainer