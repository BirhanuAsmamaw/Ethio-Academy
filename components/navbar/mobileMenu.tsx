"use client"

import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { CiLogin,CiLogout  } from "react-icons/ci";
import { SiGnuprivacyguard } from "react-icons/si";
import { SiCoursera } from "react-icons/si";
import { BiCategory } from "react-icons/bi";
import { MdOutlineDashboard } from "react-icons/md";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import CustomeSheet from "../customSheet";
 

interface MobileSidebarProps{
  user:any;
}

const MobileSidebar:React.FC<MobileSidebarProps>= ({user}) => {
 
  

 
  const category=[
    {
      name: "Highschool",
      url: "/category/Highschool"
    },
    {
      name: "Freshman",
      url: "/category/Freshman"
    },
    {
      name: "Remedial",
      url: "/category/Remedial"
    },
    {
      name: "Development",
      url: "/category/Development"
    }
  ]
  
 
    return (
     

<CustomeSheet selectedLabel={<IoMdClose size={24}/>} unselectedLabel={<IoIosMenu size={24}/>}>
<>
      <div className="space-y-2">
      <Link href="/logout" className="text-sm flex no-underline  gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <SiCoursera className="pt-1" size={20}/>  <p>Courses</p>
         </Link>
        

         <Accordion type="single" collapsible className="w-full  ">
      <AccordionItem value="item-3" className="hover:no-underline border-none">
        <AccordionTrigger className="hover:no-underline border-none"><div className="text-sm flex hover:no-underline  gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <BiCategory className="pt-1" size={20}/>  <p>Category</p>
         </div></AccordionTrigger>
        <AccordionContent>

          {category.map((c,index)=>{
            return <Link key={index} href={c.url} className="px-2 py-1 text-sm flex no-underline  gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            {c.name}
           </Link>
          })}
        
        </AccordionContent>
      </AccordionItem>
    </Accordion>
      </div>

       <hr className="border-gray-100 dark:border-gray-600"/>
      

      <div className="space-y-2">
      {!user&&<Link href="/register" className="text-sm flex no-underline  gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <SiGnuprivacyguard className="pt-1" size={20}/>  <p>Signup</p>
         </Link>}
         {!user&&<Link href="/login" className="text-sm flex no-underline  gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <CiLogin className="pt-1" size={20}/> <p>Login</p>
         </Link>}
         {user&&(user.role==='ADMIN')&&<Link href="/dashboard" className="text-sm flex no-underline  gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <MdOutlineDashboard className="pt-1" size={20}/> <p>Dashboard</p>
         </Link>}
         {user&&<Link href="/logout" className="text-sm flex no-underline  gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <CiLogout className="pt-1" size={20}/> <p>Logout</p>
         </Link>}
      </div>
        
        

      </>
</CustomeSheet>
    
   );
}
 
export default MobileSidebar;