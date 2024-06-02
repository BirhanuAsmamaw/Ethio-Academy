

import { getCurrentUser } from "@/actions/users/currentUser";
import Redirect from "@/components/Redirect";
import Navbar from "@/components/navbar/Navbar";

import Sidebar from "@/components/sidebar/sidebar";
import { ReactNode } from "react";
import DashboardSheet from "../../components/sidebar/dashboardSheet";
import Footer from "@/components/footer/footer";


interface DashboardLayoutProbs{
  children: ReactNode
}

const DashboardLayout:React.FC<DashboardLayoutProbs> =async ({children}) => {
  
  const user=await getCurrentUser();

  
  if(user){
  return ( <>
   <Navbar/>
    <div className="  grid grid-cols-1 lg:grid-cols-12 gap-20 w-full">


     <div className="fixed left-0  z-50 top-20 lg:hidden">
     <DashboardSheet user={user}/>
     </div>
  
    <div className="hidden lg:block    lg:col-span-3  xl:col-span-2 relative">
     
       
        <Sidebar user={user}/>
        
    </div>



    <div className="lg:col-span-9 min-h-screen flex flex-col  xl:col-span-10 ">
      <div className="lg:py-20  flex-grow">
      {children}
      </div>
    
    

    <div className=" pt-20">
      <Footer/>
    </div>
    </div>
  </div>

  </> );}


else{
return <Redirect url="/login"/>
}
}
 
export default DashboardLayout;


