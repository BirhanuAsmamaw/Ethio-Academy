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
import { MdOutlinePayments } from "react-icons/md";

const SidebarContent = ({user}:{user:any}) => {
  

  const isPermissionsAccessed=user?.permissions.some((permission:any)=>permission.permission.action === "CanManagePermission" ||permission.permission.action === "CanManageRole")
  const isViewAnalytics=user?.permissions.some((permission:any)=>permission.permission.action === "CanViewAalytics")
  const isManageDepartment=user?.permissions.some((permission:any)=>permission.permission.action === "CanManageDepartment")
  const isViewCustomerData=user?.permissions.some((permission:any)=>permission.permission.action === "CanViewCustomerMessage") ;
  const isApprovePayment = user.permissions.some(
    (permission:any) => permission.permission.action === "CanApprovePayment"
  );

  return (<div className="space-y-2">  {/* {!isScroll?<div className="hidden lg:block"><Logo/></div>:""} */}
    {user? <CLink url="/dashboard/profile"><><p><MdOutlinePersonOutline size={20}/></p><p>My Profile</p></></CLink>:""}
        {user? <CLink url="/dashboard/learning"><><p><MdOutlineLibraryBooks size={20}/></p><p>My Learning</p></></CLink>:""}

          {isViewAnalytics ?<CLink url="/dashboard/analytics"><><p><IoAnalytics size={20}/></p><p>Analytics</p></></CLink>:""}

          {isApprovePayment ?<CLink url="/dashboard/approve-payment"><><p><MdOutlinePayments size={20}/></p><p>Approve Payment</p></></CLink>:""}


         {isPermissionsAccessed?<CLink url="/dashboard/permission"><><p><FaCriticalRole size={20}/></p><p>Permission</p></></CLink>:""}

    <SideBarItems sidebarData={sidebarData} user={user}/>
  { isManageDepartment?  <CLink url="/dashboard/departments"><><p><TbCategoryPlus size={20}/></p><p>Department</p> </></CLink>:""}

  {isViewCustomerData?<CLink url="/dashboard/customer-message"><><BiMessageRoundedCheck size={20}/><p>Customer data </p></></CLink>:""}
    
         </div>
  )
}

export default SidebarContent
