
import { getCurrentUser } from "@/actions/currentUser";
import NavbarClient from "./NavbarClient";
import { getAllNotifications } from "@/actions/getAllNotifications";
import { getCourses } from "@/actions/getCourses";

const Navbar =async () => {
  const currentUser = await getCurrentUser();
  const notifications = await getAllNotifications();
  const courses=await getCourses();
 
  const notificationSelected=notifications?.length? notifications?.filter((n)=>n.customers.some((c)=>c.id ===  currentUser?.id)):[]
  return (<NavbarClient user={currentUser} notifications={notificationSelected} courses={courses||[]}/> );
}
 
export default Navbar;