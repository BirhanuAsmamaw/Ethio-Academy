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
import { useMyPermissionQuery } from "@/redux/features/permission/permissionApi";

const SidebarContent = ({user}:{user:any}) => {
  
const {data:permissions,isSuccess,isLoading}=useMyPermissionQuery()

if(isLoading){
  return <div className="h-full w-full flex justify-center items-center">
    <p>Loading...</p>
  </div>
}


  const isPermissionsAccessed=isSuccess&&permissions.some((permission:any)=>permission.action === "CanManagePermission" ||permission.action === "CanManageRole")
  const isViewAnalytics=isSuccess&&permissions.some((permission:any)=>permission.action === "CanViewAnalytics")
 
  const isViewCustomerData=isSuccess&&permissions.some((permission:any)=>permission.action === "CanViewCustomerMessage") ;
  const isApprovePayment = isSuccess&&permissions.some(
    (permission:any) => permission.permission?.action === "CanApprovePayment"
  );

  return (<div className="space-y-2">  {/* {!isScroll?<div className="hidden lg:block"><Logo/></div>:""} */}
    {user? <CLink url="/dashboard/profile"><><p><MdOutlinePersonOutline size={20}/></p><p>My Profile</p></></CLink>:""}
        {user? <CLink url="/dashboard/learning"><><p><MdOutlineLibraryBooks size={20}/></p><p>My Learning</p></></CLink>:""}

          {isViewAnalytics ?<CLink url="/dashboard/analytics"><><p><IoAnalytics size={20}/></p><p>Analytics</p></></CLink>:""}

          {isApprovePayment?<CLink url="/dashboard/approve-payment"><><p><MdOutlinePayments size={20}/></p><p>Approve Payment</p></></CLink>:""}


         {isPermissionsAccessed?<CLink url="/dashboard/permission"><><p><FaCriticalRole size={20}/></p><p>Permission</p></></CLink>:""}

    <SideBarItems sidebarData={sidebarData} user={user}/>


  {isViewCustomerData?<CLink url="/dashboard/customer-message"><><BiMessageRoundedCheck size={20}/><p>Customer data </p></></CLink>:""}
    
         </div>
  )
}

export default SidebarContent
