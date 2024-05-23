'use client'
import {
 
  LogOut,
 
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
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
  return ( <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <Avatar className={`h-7 w-7 `}>
      <AvatarImage src={user?.image? user?.image:"/"} alt="image" />
      <AvatarFallback>{names[0]? names[0][0]:''}{names[1]?names[1][0]:''}</AvatarFallback>
    </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 dark:bg-gray-800 rounded-md mt-2">
      <DropdownMenuLabel className="flex w-full justify-center">
        <div className=" p-1">
        <p className="font-semibold text-gray-500 dark:text-gray-400 text-[16px]">{user.name}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">{user.email}</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuGroup>
      {user&&<CLink url="/dashboard/profile">
      <DropdownMenuItem className="w-full flex justify-center ">
          <MdOutlineDashboard  className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
          <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
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






