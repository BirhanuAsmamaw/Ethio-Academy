"use client"
import { ReactNode } from "react";
import {AnimatePresence, motion} from "framer-motion"
interface SubLayoutProps{
  className?: string;
  children:ReactNode;
}
const SubLayout:React.FC<SubLayoutProps> = ({children ,className}) => {
  return (    <AnimatePresence>
    <motion.div 
    initial={{opacity : 0,y:15}}
    animate={{opacity :1,y:0}}
    exit={{opacity : 0,y:15}}
    className={`w-full md:w-11/12 lg:w-7/12  2xl:w-1/2 2xl:mr-20  p-2    flex flex-col gap-6
  ${className}
  `}>
{children}
  </motion.div>
  </AnimatePresence> );
}
 
export default SubLayout;