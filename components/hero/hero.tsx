"use client"

import Image from "next/image";
import Banner from "../../public/banner.png"
import { Avatar, AvatarGroup } from "@mui/material";
import { students } from "@/lib/students";


const Hero = () => {
  
  return ( <div className="w-full flex min-h-screen justify-center md:justify-around items-center flex-wrap px-4 items-center
    dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center"
  >
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    {/* content */}
    <div className="pt-10 md:pt-0 flex flex-col gap-20 justify-center items-center  md:w-2/3">
      <div className="flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold items-center justify-center text-center overflow-hidden">Alpha Academy, where heroes are born and excellence reigns supreme <span className="font-bold text-rose-600 dark:text-yellow-400 text-3xl md:text-5xl">!</span></h1>
      <div className="font-medium md:text-lg flex flex-col gap-1 md:mx-10 ">
      <p className="text-md px-4 font-medium dark:text-gray-400 text-slate-600 flex flex-col "> 
      <span className="text-rose-700 dark:text-yellow-300">🌟 Ignite Your Brilliance:</span> 
      <span className="pl-6 md:pl-2">Join a community of trailblazers where every individual is a beacon of inspiration.</span></p>
      <p className="text-md px-4 font-medium dark:text-gray-400  text-slate-600 flex flex-col "> 
      <span className="text-rose-700 dark:text-yellow-300">💡 Alpha Academy:</span> 
      <span className="pl-6 md:pl-2">Is not just a school; its a launchpad for greatness.</span></p>
      </div>
      </div>
    

      
      <div className="flex justify-center flex-wrap "> <div className="flex -space-x-4">
  <div className="relative flex shrink-0 select-none items-center justify-center bg-slate-200 font-bold uppercase text-slate-800 h-14 w-14 text-base rounded-full ring ring-white">
    <Image height={60} width={60} src="https://avatars.githubusercontent.com/u/739966?v=4" className="rounded-full h-full w-full object-cover object-center" alt="Avatar" loading="lazy"/>
  </div>
  <div className="relative flex shrink-0 select-none items-center justify-center bg-slate-200 font-bold uppercase text-slate-800 h-14 w-14 text-base rounded-full ring ring-white">
    <Image height={60} width={60} src="https://avatars.githubusercontent.com/u/739994?v=4" className="rounded-full h-full w-full object-cover object-center" alt="Avatar" loading="lazy"/>
  </div>
  <div className="relative flex shrink-0 select-none items-center justify-center bg-slate-200 font-bold uppercase text-slate-800 h-14 w-14 text-base rounded-full ring ring-white">
    <Image height={60} width={60} src="https://avatars.githubusercontent.com/u/739684?v=4" className="rounded-full h-full w-full object-cover object-center" alt="Avatar" loading="lazy"/>
  </div>

  <div className="relative flex shrink-0 select-none items-center justify-center bg-slate-200 font-bold uppercase text-slate-800 h-14 w-14 text-base rounded-full ring ring-white">
    <Image height={60} width={60} src="https://avatars.githubusercontent.com/u/739976?v=4" className="rounded-full h-full w-full object-cover object-center" alt="Avatar" loading="lazy"/>
  </div>
  <div className="relative flex shrink-0 select-none items-center justify-center bg-slate-200 font-bold uppercase text-slate-800 h-14 w-14 text-base rounded-full ring ring-white">
    <Image height={60} width={60} src="https://avatars.githubusercontent.com/u/739984?v=4" className="rounded-full h-full w-full object-cover object-center" alt="Avatar" loading="lazy"/>
  </div>
  <div className="relative flex shrink-0 select-none items-center justify-center bg-slate-200 font-bold uppercase text-slate-800 h-14 w-14 text-base rounded-full ring ring-white">
    <Image height={60} width={60} src="https://avatars.githubusercontent.com/u/739884?v=4" className="rounded-full h-full w-full object-cover object-center" alt="Avatar" loading="lazy"/>
  </div>
  </div>
  <h1 className="p-2 text-lg text-blue-500 dark:text-green-400 "> students trust us.</h1></div>
    </div>

    

    <div className="md:w-1/3 items-center">
      <Image  src={Banner} alt="banner" className=""/>
    </div>
  </div> );
}
 
export default Hero;