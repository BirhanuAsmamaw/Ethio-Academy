"use client"
import { BiMessageRoundedCheck } from "react-icons/bi";
import { sidebarData } from "@/lib/sidebarData";
import SideBarItems from "./sidebarItems";
import { IoAnalytics } from "react-icons/io5";
import { FaCriticalRole } from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";
import CLink from "../link";
import { MdOutlinePersonOutline } from "react-icons/md";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { useSelector } from "react-redux";
import { RooState } from "@/redux/store";
import Logo from "../logo";
import Link from "next/link";
import { FaChalkboardTeacher } from "react-icons/fa";
import { TbArrowNarrowRight } from "react-icons/tb";
import CreateInstructorLink from "../createInstructorLink";
interface SidebarProps{
  user?:any;
}
const Sidebar:React.FC<SidebarProps> = ({user}) => {

  const isScroll=useSelector((state:RooState)=>state.navigation.isScroll)
 
  const isPermissionsAccessed=user?.permissions.some((permission:any)=>permission.permission.action === "CanManagePermission" ||permission.permission.action === "CanManageRole")
  const isViewAnalytics=user?.permissions.some((permission:any)=>permission.permission.action === "CanViewAalytics")
  const isManageDepartment=user?.permissions.some((permission:any)=>permission.permission.action === "CanManageDepartment")
  const isViewCustomerData=user?.permissions.some((permission:any)=>permission.permission.action === "CanViewCustomerMessage") 


  return ( 
    <div 
    className={`fixed 
     h-screen
    
     
      bg-white
      dark:bg-gray-800
       shadow
       dark:shadow-black
        p-4
        lg:4/12 xl:w-2/12 
        overflow-y-auto 
        flex 
        flex-col 
        gap-10
        ${isScroll?'lg:py-20':'top-0 z-0 '}
        `}>
  <div className="flex flex-grow flex-col gap-4 pt-4">
    {!isScroll?<div className="hidden lg:block"><Logo/></div>:""}
     {user? <CLink url="/dashboard/profile"><><p><MdOutlinePersonOutline size={20}/></p><p>My Profile</p></></CLink>:""}
         {user? <CLink url="/dashboard/learning"><><p><MdOutlineLibraryBooks size={20}/></p><p>My Learning</p></></CLink>:""}
           {isViewAnalytics ?<CLink url="/dashboard/analytics"><><p><IoAnalytics size={20}/></p><p>Analytics</p></></CLink>:""}
          {isPermissionsAccessed?<CLink url="/dashboard/permission"><><p><FaCriticalRole size={20}/></p><p>Permission</p></></CLink>:""}

     <SideBarItems sidebarData={sidebarData} user={user}/>
   { isManageDepartment?  <CLink url="/dashboard/departments"><><p><TbCategoryPlus size={20}/></p><p>Department</p> </></CLink>:""}

   {isViewCustomerData?<CLink url="/dashboard/customer-message"><><BiMessageRoundedCheck size={20}/><p>Customer data </p></></CLink>:""}
     
          
   </div>

  <CreateInstructorLink/>
 </div> );
}
 
export default Sidebar;