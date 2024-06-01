"use client"
import React, { ReactNode } from "react";
import {motion,AnimatePresence} from "framer-motion"
import { cn } from "@/lib/utils";
interface ContainerProps{
  children: ReactNode;
  className?:string;
}

const Container:React.FC<ContainerProps> = ({ children,className}) => {
  return ( <AnimatePresence><motion.div 
    initial={{opacity: 0,y:15}}
    whileInView={{opacity:1,y:0}}
    exit={{opacity:0,y:15}}
    transition={{delay:0.25}}
    className={cn("bg-white dark:bg-gray-800 w-full dark:shadow-black py-8 px-2 sm:px-4 shadow sm:rounded-lg ",className)}>
    {children}
  </motion.div></AnimatePresence> );
}
 
export default Container;