
import { getCurrentUser } from "@/actions/users/currentUser";
import LogoutClient from "./LogoutClient";
import Navbar from "@/components/navbar/Navbar";

const Logout = async() => {
const user=await getCurrentUser();
 
  return ( <>
  <Navbar/>
  <LogoutClient user={user}/></> );
}
 
export default Logout;