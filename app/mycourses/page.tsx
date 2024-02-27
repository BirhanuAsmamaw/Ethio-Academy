import Navbar from "@/components/navbar/Navbar";


import { getCurrentUser } from "@/actions/users/currentUser";


const MyCourses = async() => {


const user=getCurrentUser();
 
  return ( <>
  <Navbar/>
 
  <div className="overflow-x-auto p-2">my courses</div>

    
  </> );
}
 
export default MyCourses;