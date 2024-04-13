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
    grid-cols-1 
    md:grid-cols-2 
    lg:grid-cols-3
     2xl:grid-cols-4 
     justify-center
      flex-wrap 
      gap-4 
      p-4
       md:px-10'>

      { children}
    </motion.div>
  </AnimatePresence>
  
  )
}

export default CourseList