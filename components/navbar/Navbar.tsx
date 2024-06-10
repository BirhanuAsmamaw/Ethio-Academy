


import { getCurrentUser } from "@/actions/users/currentUser";
import NavbarClient from "./NavbarClient";
import { getAllDepartments } from "@/actions/departments/getAllDepartments";
import { getAllExamsCategory } from "@/actions/examsCategory/getAllExamsCategry";



const Navbar =async () => {
  const currentUser = await getCurrentUser();

  const departments=await getAllDepartments();
  const exams=await getAllExamsCategory();
  
  
 

 
  return (<NavbarClient exams={exams || null} departments={departments|| null} user={currentUser}  /> );
}
 
export default Navbar;