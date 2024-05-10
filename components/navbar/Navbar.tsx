

import { getAllNotifications } from "@/actions/notifications/getAllNotifications";
import { getCurrentUser } from "@/actions/users/currentUser";
import NavbarClient from "./NavbarClient";
import { getAllDepartments } from "@/actions/departments/getAllDepartments";
import { getAllExamsCategory } from "@/actions/examsCategory/getAllExamsCategry";



const Navbar =async () => {
  const currentUser = await getCurrentUser();
  const notifications = await getAllNotifications();
  const departments=await getAllDepartments();
  const exams=await getAllExamsCategory();
  
  
 
  const notificationSelected=notifications?.length? notifications?.filter((n)=>n.customers.some((c)=>c.id ===  currentUser?.id)):[]
  return (<NavbarClient exams={exams || null} departments={departments|| null} user={currentUser} notifications={notificationSelected} /> );
}
 
export default Navbar;