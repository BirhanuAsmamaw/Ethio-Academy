

import { getCourses } from "@/actions/courses/getCourses";
import { getAllNotifications } from "@/actions/notifications/getAllNotifications";
import { getCurrentUser } from "@/actions/users/currentUser";
import NavbarClient from "./NavbarClient";



const Navbar =async () => {
  const currentUser = await getCurrentUser();
  const notifications = await getAllNotifications();
  const courses=await getCourses();
 
  const notificationSelected=notifications?.length? notifications?.filter((n)=>n.customers.some((c)=>c.id ===  currentUser?.id)):[]
  return (<NavbarClient user={currentUser} notifications={notificationSelected} courses={courses||[]}/> );
}
 
export default Navbar;