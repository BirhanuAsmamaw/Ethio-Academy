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
    <Avatar className={`${!user?.image&&'hidden'} h-7 w-7`}>
      <AvatarImage src={user?.image? user?.image:"/"} alt="image" />
      <AvatarFallback>{names[0]? names[0][0]:''}{names[1]?names[1][0]:''}</AvatarFallback>
    </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>Deribew Shimelis</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Keyboard className="mr-2 h-4 w-4" />
          <span>Keyboard shortcuts</span>
          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Users className="mr-2 h-4 w-4" />
          <span>Team</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Invite users</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                <span>Email</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Message</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>More...</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>
          <Plus className="mr-2 h-4 w-4" />
          <span>New Team</span>
          <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Github className="mr-2 h-4 w-4" />
        <span>GitHub</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <LifeBuoy className="mr-2 h-4 w-4" />
        <span>Support</span>
      </DropdownMenuItem>
      <DropdownMenuItem disabled>
        <Cloud className="mr-2 h-4 w-4" />
        <span>API</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>











   );
}}
 
export default  UserProfile ;







// <CDropDown
//   title={<>
  

  // <Avatar className={`${!user?.image&&'hidden'} h-7 w-7`}>
  //     <AvatarImage src={user?.image? user?.image:"/"} alt="image" />
  //     <AvatarFallback>{names[0]? names[0][0]:''}{names[1]?names[1][0]:''}</AvatarFallback>
  //   </Avatar>


//   <div className={`${user?.image&&'hidden'} border border-stone-300 dark:border-gray-700 relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600`}>
//       <span className="font-medium  text-gray-600 dark:text-gray-300">{names[0]? names[0][0]:''}{names[1]?names[1][0]:''}</span>
//   </div></>}
//   body={
//     <div className=" space-y-2">
//          <div className=" border-b text-center py-2 border-gray-100 dark:border-gray-700">
//            <p className="font-semibold text-gray-500 dark:text-gray-400 text-[16px]">{user.name}</p>
//            <p className="text-gray-500 dark:text-gray-400 text-xs">{user.email}</p>
//          </div>
//          <div className="flex flex-col gap-1">
         
//          <CLink url="/mycourses">
//         <> <IoBookOutline className="pt-1" size={22}/> <p>My Courses</p></>
//          </CLink>

//          <CLink url="/settings">
//          <><CiSettings className="pt-1" size={22}/> <p>Settings</p></>
//          </CLink>

//          {user&&(user.role==='ADMIN')&&<CLink url="/dashboard"><><MdOutlineDashboard className="pt-1" size={22}/> <p>Dashboard</p></></CLink>
//         }
           
//          </div>
//          <hr className="border-gray-100 dark:border-gray-700"/>
//          <CLink url="/logout">
//         <> <CiLogout className="pt-1" size={22}/> <p>Logout</p></>
//          </CLink>
//        </div>
//   }
//   />