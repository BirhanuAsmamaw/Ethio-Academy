

import { getCurrentUser } from "@/actions/users/currentUser";
import Redirect from "@/components/Redirect";
import Navbar from "@/components/navbar/Navbar";

import Sidebar from "@/components/sidebar/sidebar";
import { ReactNode } from "react";
import DashboardSheet from "./dashboardSheet";

interface DashboardLayoutProbs{
  children: ReactNode
}

const DashboardLayout:React.FC<DashboardLayoutProbs> =async ({children}) => {

  const user=await getCurrentUser();

  
  if(user&& user.role=="ADMIN"){
  return ( <>
   <Navbar/>
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-20 w-full">


     <div className="lg:hidden">
     <DashboardSheet/>
     </div>
  
    <div className="hidden lg:block  lg:col-span-3  xl:col-span-2 relative">
      <div 
      className="fixed 
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
          gap-10">
       
        <Sidebar/>
        </div>
    </div>



    <div className="md:px-6 py-4 lg:col-span-9 xl:col-span-10 ">{children}</div>
  </div>

  </> );}


else{
return <Redirect/>
}
}
 
export default DashboardLayout;


