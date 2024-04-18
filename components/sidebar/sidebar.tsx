"use client"

import { sidebarData } from "@/lib/sidebarData";
import SideBarItems from "./sidebarItems";
import { MdOutlineDashboard } from "react-icons/md";
import { FaCriticalRole } from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";
import CLink from "../link";


const Sidebar = () => {

  
  return ( <div className="flex flex-col gap-4 pt-10">
          <CLink url="/dashboard"><><p><MdOutlineDashboard size={20}/></p><p>Dashbord</p></></CLink>
          <CLink url="/dashboard/departments"><><p><TbCategoryPlus size={20}/></p><p>Department</p> </></CLink>
          <CLink url="/dashboard/permission"><><p><FaCriticalRole size={20}/></p><p>Permission</p></></CLink>



     <SideBarItems sidebarData={sidebarData}/>
     
          

 </div> );
}
 
export default Sidebar;