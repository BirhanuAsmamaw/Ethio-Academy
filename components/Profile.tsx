'use client'
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { CiSettings } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import CDropDown from "./dropdown/CustomeDropdown/CDropDown";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import CLink from "./link";
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

    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <Avatar className={`${!user?.image&&'hidden'} h-7 w-7 mt-3`}>
      <AvatarImage src={user?.image? user?.image:"/"} alt="image" />
      <AvatarFallback>{names[0]? names[0][0]:''}{names[1]?names[1][0]:''}</AvatarFallback>
    </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel className="flex w-full justify-center">
        <div className=" p-1">
        <h6 className="font-semibold text-gray-500 dark:text-gray-400 text-[16px]">{user.name}</h6>
          <p className="text-gray-500 dark:text-gray-400 text-xs">{user.email}</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
      <CLink url="/mycourses">
     <DropdownMenuItem className="w-full flex justify-center">
          <CreditCard className="mr-2 h-4 w-4" />
          <span>My Courses</span>
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        </CLink>
        


        <CLink url="/settings">
        <DropdownMenuItem className="w-full flex justify-center">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
       </CLink>
        

       
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuGroup>
      {user&&(user.role==='ADMIN')&&<CLink url="/dashboard">
      <DropdownMenuItem className="w-full flex justify-center">
          <Users className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        </CLink>
       }
       
      </DropdownMenuGroup>
     
      
      <DropdownMenuSeparator />
     <CLink url="/logout"> <DropdownMenuItem className="w-full flex justify-center">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem></CLink>
    </DropdownMenuContent>
  </DropdownMenu>











   );
}}
 
export default  UserProfile ;






