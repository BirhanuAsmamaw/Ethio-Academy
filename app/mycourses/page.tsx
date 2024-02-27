import Navbar from "@/components/navbar/Navbar";


import { getCurrentUser } from "@/actions/users/currentUser";


const MyCourses = async() => {
  const user=await getCurrentUser();


 
  return ( <>
  <Navbar/>
  <div className="min-h-screen py-10 flex flex-col justify-center ">
    
<div className="flex gap-10 flex-wrap  justify-center">
  {/* <div className="">
    <UserProfile user={user}/>
    deribew
  </div> */}
  <div className="overflow-x-auto p-2">my courses</div>
</div>
    </div>
  </> );
}
 
export default MyCourses;