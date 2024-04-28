/* eslint-disable react/no-children-prop */
"use client"
import { IoCartOutline } from "react-icons/io5";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GoMoon } from "react-icons/go";
import { LuSunMedium } from "react-icons/lu";
import Link from "next/link";
import { useCart } from "@/hooks/use.cart";
import Profile from "../Profile";
import MobileSidebar from "./mobileMenu";

import NotificationDropDown from "../dropdown/notificationDropDown";
import Search from "../search/search";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CategorySearch from "../categorySearch";
import ExamsCDrobDown from "../dropdown/CourseCategory";
import Logo from "../logo";

interface NavbarClientProps{
  user:any;
  notifications:any[];
  departments:any[]| null;
  exams:any[]|null;
 
}
const NavbarClient:React.FC<NavbarClientProps> = ({user,notifications,departments,exams}) => {
  const [isFixed, setIsFixed] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      if (currentScrollPos > 100 && isScrollingDown) {
        setIsFixed(false);
      } else {
        setIsFixed(true);
      }
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

const {setTheme}=useTheme();


const {carts}=useCart()

//logo
//https://utfs.io/f/7cffae42-32de-4353-9667-dcbfd533a893-xmr8wu.png

  return ( <div className={` w-full px-4 md:px-6 z-50 h-16 items-center   flex justify-between   ${isFixed? "shadow-md shadow-slate-300 dark:shadow-black fixed bg-white dark:bg-gray-900  ":"bg-stone-200 dark:bg-gray-900 "} duration-300 z-50`}>
   <div className="p-2 mt-2">
   <Logo/>
   </div>

     
       <div className="hidden  lg:block  flex-grow">
       <Search />
       </div>
    
     <div className="flex   justify-center">
    <div className=" hidden md:block">
      <div className="flex gap-2 ">
      <Link href="/#about" className="p-2  mt-2 no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400
       hover:text-rose-400 transition duration-300 font-medium">AboutUs</Link>

<Link href="/#service" className="p-2  mt-2 no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400
       hover:text-rose-400 transition duration-300 font-medium">Service</Link>

      <Link href="/#courseslist" className="p-2  mt-2 no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium">Courses</Link>
        <div className=" no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium">
        <ExamsCDrobDown exams={exams}/>
            
        </div>

        <div className="mt-2 no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium">
        <CategorySearch departments={departments || null}/>
            
        </div>
    

      
     
       {!user&&<Link href="/register" className="p-2  mt-2  no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium">Signup</Link>}
       {!user&&<Link href="/login" className="p-2  mt-2 no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium">Login</Link>}
     

      
    </div></div>
   
    
    {user&&<div className=" no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium">
        <Profile user={user}/>
      </div>}
      <div className="lg:hidden py-2">
       <Search />
       </div>
      <Link 
      href="/cart" 
      className="p-2 mt-2  no-underline text-gray-500 dark:text-gray-400   hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium relative ">
        <IoCartOutline size={24}/>
       <div className={`absolute top-0 right-0   h-4 w-4 flex justify-center items-center rounded-full text-black bg-blue-500 ${carts?.length? 'block':'hidden'}`}><p className="text-[10px]">{carts?.length?`${carts?.length}`:''}</p></div>
        </Link>

        {user&&<div className=" no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium">
        <NotificationDropDown notifications={notifications}/>
      </div>}
    <div className=" mt-2  p-2   no-underline text-gray-500 dark:text-gray-400   hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium ">
    <button className="dark:hidden px-1" onClick={()=>setTheme('dark')}>


<GoMoon size={24}/>
</button>
<button className="px-1 hidden dark:block" onClick={() => setTheme("light")}>
<LuSunMedium size={24}/>
</button>
    </div>

    
    <div className="md:hidden py-2">
   <MobileSidebar departments={departments|| null} user={user} exams={exams}/>
    </div>
   

  </div> </div>);
}
 
export default NavbarClient;