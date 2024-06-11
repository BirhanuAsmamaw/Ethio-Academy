"use client"

import Link from "next/link";
import CreateInstructorLink from "../createInstructorLink";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SidebarContent from "./sidebarContent";
interface SidebarProps{
  user?:any;
}
const Sidebar:React.FC<SidebarProps> = ({user}) => {

  const names=user.teacher&&user.teacher.accountName?user.teacher.accountName.split(" "):user.name.split(" ")

  return ( 
    <div 
    className={`fixed 
     h-screen
   
     
      bg-white
      dark:bg-gray-800
       shadow
       dark:shadow-black
        p-4
        z-20
        lg:w-4/12 xl:w-2/12 
        overflow-y-auto 
        flex 
        flex-col 
        gap-10
        lg:py-20
        `}>
  <div className="flex flex-grow flex-col gap-4 pt-4">
  <SidebarContent user={user}/>
   </div>

  
  {user.teacher&&user?<Link href="/dashboard/instructor/account" className=" text-center items-center border-2 text-lg truncate dark:border-gray-600 border-slate-300  no-underline hover:bg-slate-50 hover:dark:bg-gray-700 p-1 rounded-full  text-gray-800 dark:text-gray-100 justify-center flex  gap-2">
  <Avatar className={`${!user?.image&&'hidden'} h-7 w-7 `}>
      <AvatarImage src={user?.teacher.logo? user?.teacher?.logo.public_url:user?.image} alt="image" />
      <AvatarFallback>{names[0]? names[0][0]:''}{names[1]?names[1][0]:''}</AvatarFallback>
    </Avatar>
    <span>{user.teacher.accountName||user.name}</span>
    </Link>:<CreateInstructorLink/>}
 </div> );
}
 
export default Sidebar;
