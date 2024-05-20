"use client"

import { Sheet, SheetClose, SheetContent,  SheetFooter,  SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Logo from "../logo";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import SidebarContent from "./sidebarContent";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CreateInstructorLink from "../createInstructorLink";

 
interface DashboardSheetProps{
  user?:any;
}

const DashboardSheet:React.FC<DashboardSheetProps>= ({user}) => {
 
  
  const names=user.teacher&&user.teacher.accountName?user.teacher.accountName.split(" "):user.name.split(" ")

  
    return (
      <Sheet>
      <SheetTrigger asChild>
        <button className="text-3xl z-50 font-bold p-1 shadow-lg bg-white dark:bg-gray-800 
        hover:bg-slate-100 hover:dark:bg-gray-700 border-slate-300 dark:border-gray-600 border-[2px] transition duration-300 rounded-r-md"><RxDashboard size={30}/></button>
      </SheetTrigger>
      <SheetContent side='left' className="overflow-y-auto py-10  flex flex-col  h-full max-h-screen">
        <SheetHeader>
          <SheetTitle>
            <div className=" overflow-hidden"><Logo/></div>
          </SheetTitle>
          
        </SheetHeader>

        <div className="flex flex-grow flex-col gap-4 pt-4">
  <SidebarContent user={user}/>
   </div>

   
 
        
       

       <SheetFooter>
          <SheetClose asChild>
          {user?.teacher&&user?.teacher.status?<Link href="/dashboard/instructor/account" className=" text-center items-center border-2 text-lg truncate dark:border-gray-600 border-slate-300  no-underline hover:bg-slate-50 hover:dark:bg-gray-700 p-1 rounded-full  text-gray-800 dark:text-gray-100 justify-center flex  gap-2">
  <Avatar className={`${!user?.image&&'hidden'} h-7 w-7 `}>
      <AvatarImage src={user?.teacher.logo? user?.teacher?.logo.public_url:user?.image} alt="image" />
      <AvatarFallback>{names[0]? names[0][0]:''}{names[1]?names[1][0]:''}</AvatarFallback>
    </Avatar>
    <span>{user.teacher.accountName||user.name}</span>
    </Link>:<CreateInstructorLink/>}
          </SheetClose>
        </SheetFooter>
      </SheetContent>


    </Sheet>
    );
      


    
   
}
 
export default DashboardSheet;