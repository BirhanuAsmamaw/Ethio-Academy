import Navbar from "@/components/navbar/Navbar";


import { getCurrentUser } from "@/actions/users/currentUser";


const MyCourses = async() => {


const user=await getCurrentUser();
 
  return ( <>
  <Navbar/>
 
  <div className="overflow-x-auto p-2">my courses {user?.name}</div>

    
  </> );
}
 
export default MyCourses;