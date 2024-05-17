"use client"

import { Sheet, SheetClose, SheetContent,  SheetFooter,  SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Logo from "../logo";
import CLink from "../link";
import { MdOutlineLibraryBooks, MdOutlinePersonOutline} from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import { FaChalkboardTeacher, FaCriticalRole } from "react-icons/fa";
import { TbArrowNarrowRight, TbCategoryPlus } from "react-icons/tb";
import Link from "next/link";
import { sidebarData } from "@/lib/sidebarData";
import SideBarItems from "./sidebarItems";
import { BiMessageRoundedCheck } from "react-icons/bi";

import { RxDashboard } from "react-icons/rx";

 
interface DashboardSheetProps{
  user?:any;
}

const DashboardSheet:React.FC<DashboardSheetProps>= ({user}) => {
 
  
 
  const isPermissionsAccessed=user?.permissions.some((permission:any)=>permission.permission.action === "CanManagePermission" ||permission.permission.action === "CanManageRole")
  const isViewAnalytics=user?.permissions.some((permission:any)=>permission.permission.action === "CanViewAalytics")
  const isManageDepartment=user?.permissions.some((permission:any)=>permission.permission.action === "CanManageDepartment")
  const isViewCustomerData=user?.permissions.some((permission:any)=>permission.permission.action === "CanViewCustomerMessage") 

  
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
   
     {user? <CLink url="/dashboard/profile"><><p><MdOutlinePersonOutline size={20}/></p><p>My Profile</p></></CLink>:""}
         {user? <CLink url="/dashboard/learning"><><p><MdOutlineLibraryBooks size={20}/></p><p>My Learning</p></></CLink>:""}
           {isViewAnalytics ?<CLink url="/dashboard/analytics"><><p><IoAnalytics size={20}/></p><p>Analytics</p></></CLink>:""}
          {isPermissionsAccessed?<CLink url="/dashboard/permission"><><p><FaCriticalRole size={20}/></p><p>Permission</p></></CLink>:""}

     <SideBarItems sidebarData={sidebarData} user={user}/>
   { isManageDepartment?  <CLink url="/dashboard/departments"><><p><TbCategoryPlus size={20}/></p><p>Department</p> </></CLink>:""}

   {isViewCustomerData?<CLink url="/dashboard/customer-message"><><BiMessageRoundedCheck size={20}/><p>Customer data </p></></CLink>:""}
     
          
   </div>

   
 
        
       

       <SheetFooter>
          <SheetClose asChild>
          <Link href="/dashboard/instructor" className="px-3 py-2 shadow-sm border-2 border-blue-600 shadow-blue-600 gap-2 hover:scale-105 no-underline hover:bg-blue-700 hover:font-medium  items-center leading-6  rounded-full text-center text-white flex  justify-center bg-blue-600 transition-all duration-300">
    <FaChalkboardTeacher size={20}/>
    <span className=" truncate">Become Instructor</span>
    <TbArrowNarrowRight size={20}/>
     </Link>
          </SheetClose>
        </SheetFooter>
      </SheetContent>


    </Sheet>
    );
      


    
   
}
 
export default DashboardSheet;