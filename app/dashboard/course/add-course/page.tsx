

import CreateCourseClient from "./createCourseClient";
import { getAllDepartments } from "@/actions/departments/getAllDepartments";
import { getCurrentUser } from "@/actions/users/currentUser";


const CreateCourse = async() => {
  const departments=await  getAllDepartments();
  const user=await getCurrentUser();
  const isDataAccessed=user?.permissions.some((permission)=>permission.permission.action === "CanManageCourse" || permission.permission.action === "CanCreateCourse")

  if(!user?.teacher){
    return null;
  }

  if(!user?.teacher.status){
   return null;
  }

  if(!isDataAccessed){
    return null;
  }

 
  return (  <CreateCourseClient departments={departments}/>);
}
 
export default CreateCourse;