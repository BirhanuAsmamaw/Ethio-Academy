

import { getAllNotifications } from "@/actions/notifications/getAllNotifications";
import { getCurrentUser } from "@/actions/users/currentUser";
import NavbarClient from "./NavbarClient";
import { getAllDepartments } from "@/actions/departments/getAllDepartments";



const Navbar =async () => {
  const currentUser = await getCurrentUser();
  const notifications = await getAllNotifications();
  const departments=await getAllDepartments();
  
 
  const notificationSelected=notifications?.length? notifications?.filter((n)=>n.customers.some((c)=>c.id ===  currentUser?.id)):[]
  return (<NavbarClient departments={departments|| null} user={currentUser} notifications={notificationSelected} /> );
}
 
export default Navbar;