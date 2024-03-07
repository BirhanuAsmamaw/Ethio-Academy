'use client'
import { CiSettings } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import CDropDown from "./dropdown/CustomeDropdown/CDropDown";
interface UserProfileProps{
 
  user:any;
}

const UserProfile:React.FC<UserProfileProps>  = ({user}) => {
  
  if (!user){
    return <h1>No User</h1>
  }
  else{
    const names=user.name.split(" ")
  return ( 
  <CDropDown
  title={<><div 
    className={`
    relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full
  `}>
      <Image width={7} height={7} className={`${!user?.image&&'hidden'} bg-gray-600 rounded-full object-contain aspect-square h-full w-full `}   src={user?.image? user?.image:"/"} alt="Rounded avatar"/>
  </div>


  <div className={`${user?.image&&'hidden'} border border-stone-300 dark:border-gray-700 relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600`}>
      <span className="font-medium  text-gray-600 dark:text-gray-300">{names[0]? names[0][0]:''}{names[1]?names[1][0]:''}</span>
  </div></>}
  body={
    <div className=" space-y-2">
         <div className=" border-b text-center py-2 border-gray-100 dark:border-gray-700">
           <p className="font-semibold text-gray-500 dark:text-gray-400 text-[16px]">{user.name}</p>
           <p className="text-gray-500 dark:text-gray-400 text-xs">{user.email}</p>
         </div>
         <div className="flex flex-col">
         <Link href="/mycourses" className="flex no-underline text-sm gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <IoBookOutline className="pt-1" size={20}/> <p>My Courses</p>
         </Link>
             <Link href="/settings" className="flex text-sm no-underline  gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <CiSettings className="pt-1" size={20}/> <p>Settings</p>
         </Link>
         {user&&(user.role==='ADMIN')&&<Link href="/dashboard" className="text-sm flex no-underline  gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <MdOutlineDashboard className="pt-1" size={20}/> <p>Dashboard</p>
         </Link>}
           
         </div>
         <hr className="border-gray-100 dark:border-gray-700"/>
         <Link href="/logout" className="text-sm flex no-underline  gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <CiLogout className="pt-1" size={20}/> <p>Logout</p>
         </Link>
       </div>
  }
  /> );
}}
 
export default  UserProfile ;