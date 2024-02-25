
import { getCurrentUser } from "@/actions/currentUser";
import NavbarClient from "./NavbarClient";
import { getAllNotifications } from "@/actions/getAllNotifications";

const Navbar =async () => {
  const currentUser = await getCurrentUser();
  const notifications = await getAllNotifications();
 
  const notificationSelected=notifications?.length? notifications?.filter((n)=>n.customers.some((c)=>c.id ===  currentUser?.id)):[]
  return (<NavbarClient user={currentUser} notifications={notificationSelected}/> );
}
 
export default Navbar;