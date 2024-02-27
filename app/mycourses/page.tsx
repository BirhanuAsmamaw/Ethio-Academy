import Navbar from "@/components/navbar/Navbar";
import MyCourseClient from "./mycourse";
import UserProfile from "@/components/userprofile/userProfile";
import { getCurrentUser } from "@/actions/users/currentUser";


const MyCourses = async() => {
  const user=await getCurrentUser();
  console.log(user?.payedCourses);
  return ( <>
  <Navbar/>
  <div className="min-h-screen flex flex-col justify-center ">
    
<div className="flex gap-10 flex-wrap  justify-center">
  <div className="">
    <UserProfile/>
  </div>
  <div className="overflow-x-auto p-2"><MyCourseClient/></div>
</div>
    </div>
  </> );
}
 
export default MyCourses;