"use client"

import { sidebarData } from "@/lib/sidebarData";
import SideBarItems from "./sidebarItems";
import { IoAnalytics } from "react-icons/io5";
import { FaCriticalRole } from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";
import CLink from "../link";
import { MdOutlinePersonOutline } from "react-icons/md";
import { MdOutlineLibraryBooks } from "react-icons/md";
interface SidebarProps{
  user?:any;
}
const Sidebar:React.FC<SidebarProps> = ({user}) => {

  const isPermissionsAccessed=user?.permissions.some((permission:any)=>permission.permission.action === "CanManagePermission" ||permission.permission.action === "CanManageRole")
  const isViewAnalytics=user?.permissions.some((permission:any)=>permission.permission.action === "CanViewAalytics")
  const isManageDepartment=user?.permissions.some((permission:any)=>permission.permission.action === "CanManageDepartment")
  return ( <div className="flex flex-col gap-4 pt-10">
     {user? <CLink url="/dashboard/profile"><><p><MdOutlinePersonOutline size={20}/></p><p>My Profile</p></></CLink>:""}
         {user? <CLink url="/dashboard/learning"><><p><MdOutlineLibraryBooks size={20}/></p><p>My Learning</p></></CLink>:""}
           {isViewAnalytics ?<CLink url="/dashboard/analytics"><><p><IoAnalytics size={20}/></p><p>Analytics</p></></CLink>:""}
          {isPermissionsAccessed?<CLink url="/dashboard/permission"><><p><FaCriticalRole size={20}/></p><p>Permission</p></></CLink>:""}

     <SideBarItems sidebarData={sidebarData} user={user}/>
   { isManageDepartment?  <CLink url="/dashboard/departments"><><p><TbCategoryPlus size={20}/></p><p>Department</p> </></CLink>:""}
     
          

 </div> );
}
 
export default Sidebar;