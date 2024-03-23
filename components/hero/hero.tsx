"use client"

import Image from "next/image";
import Banner from "../../public/banner.png"
import { motion } from "framer-motion";


const Hero = () => {

  const textVariants = {
    initial: {
      x: -500,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    },
    scrollButton: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };
  const sliderVariants = {
    initial: {
      x: "220%",
    },
    animate: {
      x: 0,
      transition: {
        
       
        duration: 2,
      },
    },
  };
  const users=[
    "https://avatars.githubusercontent.com/u/739984?v=4",
    "https://avatars.githubusercontent.com/u/739985?v=4",
    "https://avatars.githubusercontent.com/u/739989?v=4",
    "https://avatars.githubusercontent.com/u/739981?v=4",
    "https://avatars.githubusercontent.com/u/739987?v=4"


  ]
  
  return ( <div
    className=" w-full flex min-h-screen justify-center md:justify-around  flex-wrap px-4 items-center
    dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative "
  >
    <motion.div  variants={textVariants}
    initial="initial"
    animate="animate"className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></motion.div>
    {/* content */}
    <div className="pt-10 md:pt-0 flex flex-col gap-20 justify-center items-center  md:w-2/3">
      <div className="flex flex-col gap-6">
      <motion.h1 variants={textVariants} className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold items-center justify-center text-center overflow-hidden">Ethio Exams Academy, where heroes are born and excellence reigns supreme <span className="font-bold text-rose-500 dark:text-yellow-400 text-3xl md:text-5xl">!</span></motion.h1>
      <div className="font-medium md:text-lg flex flex-col gap-1 md:mx-10 ">
      <p className="text-md px-4 font-medium dark:text-gray-400 text-slate-500 flex flex-col "> 
      <motion.span variants={textVariants}  className="text-rose-700 dark:text-yellow-300">🌟 Ignite Your Brilliance:</motion.span> 
      <motion.span variants={textVariants} className="pl-6 md:pl-2">Join a community of trailblazers where every individual is a beacon of inspiration.</motion.span></p>
      <p className="text-md px-4 font-medium dark:text-gray-400  text-slate-500 flex flex-col "> 
      <motion.span variants={textVariants} className="text-rose-700 dark:text-yellow-300">💡 Ethio Exams  Academy:</motion.span> 
      <motion.span  variants={textVariants} className="pl-6 md:pl-2">Is not just a school; its a launchpad for greatness.</motion.span></p>
      </div>
      </div>
    

      
      <div className="flex justify-start flex-wrap w-full md:px-10"> <motion.div variants={textVariants}
    initial="initial"
    animate="animate" className="flex -space-x-4">
 
  {users.map((user,index) =><div key={index} className="relative flex shrink-0 select-none items-center justify-center bg-slate-200 font-bold  dark:bg-gray-800 uppercase text-slate-800 dark:text-gray-400 h-14 w-14 rounded-full ring ring-white dark:ring-gray-600">
    <Image height={50} width={50} src={user} className="rounded-full h-full w-full object-cover object-center" alt="Avatar" loading="lazy"/>
  </div>)}
  <div className="relative flex shrink-0 select-none items-center justify-center bg-slate-200 font-bold  dark:bg-gray-800 uppercase text-slate-800 dark:text-gray-400 h-14 w-14 rounded-full ring ring-white dark:ring-gray-600">
<span className="text-lg font-bold">10k+</span>
  </div>
  </motion.div>
  <motion.h1 variants={textVariants} className="px-2 py-3 text-xl font-semibold  text-blue-700 dark:text-green-400 "> Students Trust us.</motion.h1></div>
    </div>

    

    <motion.div 
   variants={sliderVariants}
        initial="initial"
        animate="animate" className="md:w-1/3 items-center">
      <Image  src={Banner} alt="banner" className=""/>
    </motion.div>

  </div> );
}
 
export default Hero;