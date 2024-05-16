"use client"
import React, { ReactNode } from 'react'
import {motion,AnimatePresence} from "framer-motion"
interface CourseListProps{
  children:ReactNode
}
const CourseList:React.FC<CourseListProps> = ({ children}) => {
  return (<AnimatePresence>
     <motion.div 
    

     
     className='
    grid 
    
   grid-cols-2 
    lg:grid-cols-3
     2xl:grid-cols-4 
     justify-center
      flex-wrap 
      gap-2
      md:gap-10
       items-center
       w-full

      p-4
       md:px-10'>

      { children}
    </motion.div>
  </AnimatePresence>
  
  )
}

export default CourseList