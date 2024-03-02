/* eslint-disable react/no-children-prop */
"use client"
import { IoCartOutline } from "react-icons/io5";
import { useTheme } from "next-themes";
import Logo from "../../public/alpha.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GoMoon } from "react-icons/go";
import { LuSunMedium } from "react-icons/lu";
import Link from "next/link";
import { useCart } from "@/hooks/use.cart";
import Profile from "../Profile";
import MobileSidebar from "./mobileMenu";
import CategorCDrobDown from "../dropdown/CourseCategory";

import NotificationDropDown from "../dropdown/notificationDropDown";
import Search from "../search/search";
import { CourseType } from "@/types";
interface NavbarClientProps{
  user:any;
  notifications:any[];
 
}
const NavbarClient:React.FC<NavbarClientProps> = ({user,notifications}) => {
  const [isScroll,setScroll] =useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

const {setTheme}=useTheme();


const {carts}=useCart()

  return ( <div className={` w-full px-2 z-50 h-12 items-center   flex justify-between flex-wrap  ${isScroll? "shadow-md shadow-slate-300 dark:shadow-black fixed bg-white dark:bg-gray-900  ":"bg-stone-200 dark:bg-gray-900 "} duration-300 z-50`}>
    <Link href="/" className="no-underline flex gap-2"><Image src={Logo} alt="logo" className="w-10 h-10 rounded-full" height={30} width={30}/>
     <h1 className="hidden md:block font-semibold text-xl md:text-2xl py-2 overflow-hidden">
      <span className="text-blue-600">Alpha</span>
    <span className="text-teal-600"> Academy</span>
     </h1></Link>

     
       <div className="hidden pb-2 lg:block w-md">
       <Search />
       </div>
    
     <div className="flex   justify-center">
    <div className=" hidden md:block">
      <div className="flex ">
        <div className="pb-2 no-underline text-gray-500 dark:text-gray-400 font-medium  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium">
        <CategorCDrobDown/>
            
        </div>
      <Link href="/#courseslist" className="p-2 no-underline text-gray-500 dark:text-gray-400 font-medium  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium">Courses</Link>

      
     
       {!user&&<Link href="/register" className="p-2 no-underline text-gray-500 dark:text-gray-400 font-medium  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium">Signup</Link>}
       {!user&&<Link href="/login" className="p-2 no-underline text-gray-500 dark:text-gray-400 font-medium  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium">Login</Link>}
     

      
    </div></div>
   
    
    {user&&<div className="pb-2 no-underline text-gray-500 dark:text-gray-400 font-medium  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium">
        <Profile user={user}/>
      </div>}
      <div className="lg:hidden">
       <Search />
       </div>
      <Link 
      href="/cart" 
      className="p-2 no-underline text-gray-500 dark:text-gray-400 font-medium  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium relative ">
        <IoCartOutline size={24}/>
       <div className={`absolute top-0 right-0   h-4 w-4 flex justify-center items-center rounded-full text-black bg-blue-500 ${carts?.length? 'block':'hidden'}`}><p className="text-[10px]">{carts?.length?`${carts?.length}`:''}</p></div>
        </Link>

        {user&&<div className="pb-2 no-underline text-gray-500 dark:text-gray-400 font-medium  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium">
        <NotificationDropDown notifications={notifications}/>
      </div>}
    <div className="  p-2 no-underline text-gray-500 dark:text-gray-400 font-medium  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium ">
    <button className="dark:hidden px-1" onClick={()=>setTheme('dark')}>


<GoMoon size={24}/>
</button>
<button className="px-1 hidden dark:block" onClick={() => setTheme("light")}>
<LuSunMedium size={24}/>
</button>
    </div>

    
    <div className="md:hidden">
   <MobileSidebar user={user}/>
    </div>
   

  </div> </div>);
}
 
export default NavbarClient;