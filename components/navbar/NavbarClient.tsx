/* eslint-disable react/no-children-prop */
"use client"
import { IoCartOutline } from "react-icons/io5";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GoMoon } from "react-icons/go";
import { LuSunMedium } from "react-icons/lu";
import Link from "next/link";
import { useCart } from "@/hooks/use.cart";
import UserProfile from "../userProfile/Profile";
import MobileSidebar from "./mobileMenu";
import NotificationDropDown from "../dropdown/notificationDropDown";
import Search from "../search/search";
import Logo from "../logo";
import CategoryNavigation from "./categoryNavigation";
import ExamsLists from "./examsLists";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RooState } from "@/redux/store";
import { setnavigationScroll } from "@/redux/features/navigation/navigationSlice";
import { TbArrowNarrowRight } from "react-icons/tb";
import { SiGnuprivacyguard } from "react-icons/si";
import SecondNavigation from "./secondNavigation";
interface NavbarClientProps{
  user:any;
 
  departments:any[]| null;
  exams:any[]|null;
 
}
const NavbarClient:React.FC<NavbarClientProps> = ({user,departments,exams}) => {

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const dispatch=useDispatch();
  const isScroll=useSelector((state:RooState)=>state.navigation.isScroll)
 
 
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
     

      const isScrollingDown = currentScrollPos > prevScrollPos;

      if (currentScrollPos > 80 && isScrollingDown) {
        dispatch(setnavigationScroll({ isScroll: false }));
      } else {
        dispatch(setnavigationScroll({ isScroll: true }));
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, dispatch]);

const {setTheme}=useTheme();


const {carts}=useCart()
const pathName=usePathname()||"";
const hashPath = pathName&&pathName.replace("/", "/#");

const hoverLink='z-50 link decoration-none relative pb-1 hover:dark:text-green-400 hover:text-blue-500 hover:font-medium before:bg-yellow-400  '



//logo
//https://utfs.io/f/7cffae42-32de-4353-9667-dcbfd533a893-xmr8wu.png

  return (<nav>

    {/* //second Navbar */}
   { !isScroll?<SecondNavigation user={user}/>:""}



    <div className={`  w-full px-2 md:px-6 z-50 h-16 items-center gap-4  flex justify-between   ${isScroll? " border-b border-slate-200 dark:border-gray-700  fixed dark:bg-gray-800  ":"hidden "} duration-300 z-50 bg-white dark:bg-gray-800 `}>
   
   <Logo/>
  

     <CategoryNavigation departments={departments}/>


       <div className="hidden  lg:block  flex-grow px-10">
       <Search />
       </div>
    
     <div className="flex  space-x-2  justify-center items-center h-full">
    <div className=" hidden  lg:block  ">
      <div className="flex gap-x-4 h-full items-center ">
        
      <ExamsLists exams={exams}/>
      <Link href="/#courseslist" className={`${hashPath==="/#courseslist"&&'text-blue-600 dark:text-green-400 font-semibold'}  no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400
       hover:text-rose-400 transition duration-300 font-medium ${hoverLink}`}>Courses</Link>

      <Link href="/#about" className={`${pathName==="/#about"&&'text-blue-600 dark:text-green-400 font-semibold'} no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400
       hover:text-rose-400 transition duration-300 font-medium ${hoverLink}`}>AboutUs</Link>

<Link href="/#service" className={`${hashPath==="/#service"&&'text-blue-600 dark:text-green-400 font-semibold'} no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400
       hover:text-rose-400 transition duration-300 font-medium ${hoverLink}`}>Service</Link>
<Link href="/#contact" className={`${hashPath==="/#contact"&&'text-blue-600 dark:text-green-400 font-semibold'}  no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400
       hover:text-rose-400 transition duration-300 font-medium ${hoverLink}`}>Contact</Link>

      
        

      

{!user&&<Link href="/register"  className={`px-2 py-1 hover:dark:text-green-400
       hover:text-rose-400 font-medium shadow-sm border-2 border-blue-600 shadow-blue-600 gap-2 hover:scale-105 no-underline hover:bg-blue-700 hover:font-medium  items-center leading-6  rounded-full text-center text-white flex  justify-center bg-blue-600 transition-all duration-300 
${pathName==="/register"&&'text-blue-600 dark:text-green-400 font-semibold'} `}>
  <SiGnuprivacyguard className="pt-1" size={20}/>
  <span className=" truncate">Sign up</span>
  <TbArrowNarrowRight size={20}/>
   </Link>}
       {!user&&<Link href="/login" className={`${pathName==="/login"&&'text-blue-600 dark:text-green-400 font-semibold'} no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400
       hover:text-rose-400 transition duration-300 font-medium ${hoverLink}`}>Login</Link>}
     

      
    </div></div>
   
    
    {user&&<div className=" no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400 hover:text-rose-400 transition duration-300 font-medium">
        < UserProfile  user={user}/>
      </div>}
      <div className={` lg:hidden  `}>
       <Search />
       </div>
      <Link 
      href="/cart" 
      className={` ${pathName==="/cart"&&'text-blue-600 dark:text-green-400 font-semibold'} no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400
       hover:text-rose-400 transition duration-300  relative font-medium ${hoverLink}`}>
        <IoCartOutline size={24}/>
       <div className={`absolute -top-2 -right-2   h-4 w-4 flex justify-center items-center rounded-full text-black bg-blue-500 ${carts?.length? 'block':'hidden'}`}><p className="text-[10px]">{carts?.length?`${carts?.length}`:''}</p></div>
        </Link>

        {user&&<div className={` no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400
       hover:text-rose-400 transition duration-300 font-medium ${hoverLink}`}>
        <NotificationDropDown/>
      </div>}
    <div>
    <button className={` no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400
       hover:text-rose-400 dark:hidden transition duration-300 font-medium ${hoverLink}`} onClick={()=>setTheme('dark')}>


<GoMoon size={24}/>
</button>
<button  className={` hidden dark:block no-underline text-gray-500 dark:text-gray-400  hover:dark:text-green-400
       hover:text-rose-400  transition duration-300 font-medium ${hoverLink}`} onClick={() => setTheme("light")}>
<LuSunMedium size={24}/>
</button>
    </div>

    
    <div className="xl:hidden py-2">
   <MobileSidebar departments={departments|| null} user={user} exams={exams}/>
    </div>
   

  </div> </div></nav> );
}
 
export default NavbarClient;