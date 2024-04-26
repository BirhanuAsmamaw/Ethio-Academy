"use client"
import Image from 'next/image'
import React from 'react'
import DarkPc from "../../public/dark.pc.png"
import LightPc from "../../public/light.pc.png"
import {motion} from "framer-motion"
const PcComponent = () => {
  return (<div>

<div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
    <motion.div 
    initial={{opacity:0,y:15}}
    whileInView={{opacity:1,y:0}}
    transition={{delay:0.15,duration:0.25}}
    className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
        <Image height={156} width={300} src={LightPc} className="dark:hidden h-[156px] md:h-[278px] w-full rounded-xl" alt=""/>
        <Image height={156} width={300}  src={DarkPc} className="hidden dark:block h-[156px] md:h-[278px] w-full rounded-lg" alt=""/>
    </motion.div>
</div>
<div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
    <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
</div>

  </div>)
  
}

export default PcComponent