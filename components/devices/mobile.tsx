"use client"
import Image from 'next/image'
import React from 'react'
import DarkMobile from "../../public/mobile.dark.png"
import LightMobile from "../../public/mobile.light.png"
import {motion} from "framer-motion"
const MobileComponent = () => {
  return (<>
  <motion.div 
  initial={{opacity:0,y:15}}
  whileInView={{opacity:1,y:0}}
  transition={{delay:0.15,duration:0.25}}
  className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-xl h-[600px] w-[300px] shadow-xl">
    <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
    <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
    <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
    <div className="rounded-xl overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
        <Image
         width={272} 
         height={572} 
        src={LightMobile} className="dark:hidden w-[272px] h-[572px]" alt=""/>
        <Image 
        width={272}  height={572}
        src={DarkMobile} className="hidden dark:block w-[272px] h-[572px]" alt=""/>
    </div>
</motion.div></>

    
  )
}

export default MobileComponent 