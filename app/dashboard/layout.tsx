

import { getCurrentUser } from "@/actions/users/currentUser";
import Redirect from "@/components/Redirect";
import Navbar from "@/components/navbar/Navbar";

import Sidebar from "@/components/sidebar/sidebar";
import { ReactNode } from "react";
import DashboardSheet from "./dashboardSheet";
import Footer from "@/components/footer/footer";

interface DashboardLayoutProbs{
  children: ReactNode
}

const DashboardLayout:React.FC<DashboardLayoutProbs> =async ({children}) => {

  const user=await getCurrentUser();

  
  if(user){
  return ( <>
   <Navbar/>
    <div className="min-h-screen  grid grid-cols-1 lg:grid-cols-12 gap-20 w-full">


     <div className="lg:hidden">
     <DashboardSheet/>
     </div>
  
    <div className="hidden lg:block  lg:col-span-3  xl:col-span-2 relative">
      <div 
      className="fixed 
       h-screen
       lg:py-20
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
       
        <Sidebar user={user}/>
        </div>
    </div>



    <div className="md:px-6 lg:py-20 lg:col-span-9 xl:col-span-10 ">{children}
    
    

    <div className=" pt-20">
      <Footer/>
    </div>
    </div>
  </div>

  </> );}


else{
return <Redirect/>
}
}
 
export default DashboardLayout;


