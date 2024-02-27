import Navbar from "@/components/navbar/Navbar";


import { getCurrentUser } from "@/actions/users/currentUser";
import MyCourseClient from "./mycourse";


const MyCourses = async() => {


const user=await getCurrentUser();
 
  return ( <>
  <Navbar/>
 
  <div className="overflow-x-auto p-2">
    <MyCourseClient user={user}/>
  </div>

    
  </> );
}
 
export default MyCourses;