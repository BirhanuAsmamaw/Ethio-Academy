import React, { ReactNode } from "react";
import {motion} from "framer-motion"
interface ContainerProps{
  childern: ReactNode;
}

const Container:React.FC<ContainerProps> = ({childern}) => {
  return ( <motion.div 
    initial={{opacity: 0,y:15}}
    whileInView={{opacity:1,y:0}}
    exit={{opacity:0,y:15}}
    transition={{delay:0.25}}
  className="bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-600 border-[1.5px] rounded-[5px]">
    {childern}
  </motion.div> );
}
 
export default Container;