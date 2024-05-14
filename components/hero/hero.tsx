"use client"

import Image from "next/image";
import { motion } from "framer-motion";


interface HeroProps{
  banner:any
}

const Hero:React.FC<HeroProps> = ({banner}) => {

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
    "https://avatars.githubusercontent.com/u/739995?v=4",
    "https://avatars.githubusercontent.com/u/739985?v=4",
    "https://avatars.githubusercontent.com/u/739955?v=4",
    "https://avatars.githubusercontent.com/u/739987?v=4"


  ]
  
  return ( <section
    className="bg-white dark:bg-gray-900 pt-10  w-full flex min-h-screen justify-center md:justify-around  flex-wrap px-4 items-center
    dark:bg-grid-gray-700 bg-grid-gray-300 relative "
  >
    <motion.div  variants={textVariants}
    initial="initial"
    animate="animate"className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></motion.div>
    {/* content */}
    <div className=" flex flex-col gap-20 justify-center items-center  md:w-2/3">
      <div className="flex w-full   flex-col gap-6">
      <motion.h1 
      variants={textVariants} 
      className=" 
      drop-shadow-md
        font-bold 
        z-10  text-left
        overflow-hidden pt-20 pl-10 md:pl-20   flex flex-col w-full">
          <span  className="text-4xl md:text-5xl lg:text-6xl ">
            <span className="text-blue-500 dark:text-green-400 tracking-tight !leading-tight">Ethio</span>
            <span className="text-rose-500 dark:text-yellow-400">Academy</span>
          </span>
          <span className="tracking-tight w-full text-wrap !leading-tight text-gray-700 text-3xl md:text-4xl lg:text-5xl dark:text-gray-200">{banner?.title} <span className="font-bold text-rose-500 dark:text-yellow-400 text-3xl md:text-4xl lg:text-5xl">!</span></span>
          </motion.h1>
      <div className="md:text-lg py-6 md:pt-10 flex flex-col gap-y-4 lg:mx-10 ">
      <p className="text-md px-4 font-medium dark:text-gray-400 text-slate-500 flex flex-col "> 
      <motion.span variants={textVariants}  className="text-green-600 font-semibold !leading-tight tracking-tight dark:text-yellow-300 drop-shadow-md ">🌟 Ignite Your Brilliance:</motion.span> 
      <motion.span variants={textVariants} className="pl-6 md:pl-2 drop-shadow-md text-gray-600 dark:text-gray-300 tracking-tight ">Join a community of trailblazers where every individual is a beacon of inspiration.</motion.span></p>
      <p className="text-md px-4 font-medium dark:text-gray-400  text-slate-500 flex flex-col "> 
      <motion.span variants={textVariants} className="text-green-600 font-semibold tracking-tight !leading-tight dark:text-yellow-300 drop-shadow-md">💡 Ethio Exams  Academy:</motion.span> 
      <motion.span  variants={textVariants} className=" text-gray-600 dark:text-gray-300 tracking-tight  pl-6 md:pl-2 drop-shadow-md">Is not just a school; its a launchpad for greatness.</motion.span></p>
      </div>
      </div>
    

      
      <div className="flex  md:pb-20 justify-start flex-wrap w-full md:px-10"> <motion.div variants={textVariants}
    initial="initial"
    animate="animate" className="flex -space-x-4">
 
  {users.map((user,index) =><div key={index} className="relative flex shrink-0 select-none items-center justify-center bg-slate-200 font-bold  dark:bg-gray-800 uppercase text-slate-800 dark:text-gray-400 h-10 w-10  lg:h-12 lg:w-12 rounded-full ring ring-white dark:ring-gray-600">
    <Image height={30} width={30} src={user} className="rounded-full h-full w-full object-cover object-center" alt="Avatar" loading="lazy"/>
  </div>)}
  <div className="relative flex shrink-0  drop-shadow-md select-none items-center justify-center bg-slate-200 font-bold  dark:bg-gray-800 uppercase text-slate-800 dark:text-gray-400 h-10 w-10 lg:h-12 lg:w-12 rounded-full ring ring-white dark:ring-gray-600">
<span className="text-sm font-bold drop-shadow-md">10k+</span>
  </div>
  </motion.div>
  <motion.h1 variants={textVariants} className="px-2 py-3 text-base md:text-lg font-semibold  text-blue-700 dark:text-green-400 drop-shadow-md "> Students Trust us.</motion.h1></div>
    </div>

    

    <motion.div 
   variants={sliderVariants}
        initial="initial"
        animate="animate" className="md:w-1/3 items-center">
      <Image  src={banner?.logo.public_url} alt="banner" height={400} width={400} className=""/>
    </motion.div>

  </section> );
}
 
export default Hero;