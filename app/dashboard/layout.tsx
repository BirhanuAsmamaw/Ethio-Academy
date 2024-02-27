

import { getCurrentUser } from "@/actions/users/currentUser";
import Redirect from "@/components/Redirect";
import Navbar from "@/components/navbar/Navbar";

import Sidebar from "@/components/sidebar/sidebar";
import { ReactNode } from "react";

interface DashboardLayoutProbs{
  children: ReactNode
}

const DashboardLayout:React.FC<DashboardLayoutProbs> =async ({children}) => {

  const user=await getCurrentUser();

  
  if(user&& user.role=="ADMIN"){
  return ( <div className="">
   <Navbar/>
    <div className=" flex gap-10 justify-center pt-10 w-full">
      

          <div className="hidden lg:p-10 w-64 lg:block fixed lg:p-10 left-0 h-screen  bg-white dark:bg-gray-800 w-48 overflow-y-auto"><Sidebar/></div>
         


          <div className="w-full  px-2 l lg:w-8/12 xl:w-7/12 flex justify-center pt-10 border-x border-gray-200 dark:border-gray-700">
    
    {children}
      </div>
    </div>

  </div> );}


else{
return <Redirect/>
}
}
 
export default DashboardLayout;