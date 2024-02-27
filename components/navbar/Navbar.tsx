

import { getAllNotifications } from "@/actions/notifications/getAllNotifications";
import { getCurrentUser } from "@/actions/users/currentUser";
import NavbarClient from "./NavbarClient";



const Navbar =async () => {
  const currentUser = await getCurrentUser();
  const notifications = await getAllNotifications();
  
 
  const notificationSelected=notifications?.length? notifications?.filter((n)=>n.customers.some((c)=>c.id ===  currentUser?.id)):[]
  return (<NavbarClient user={currentUser} notifications={notificationSelected} /> );
}
 
export default Navbar;