

import CreateCourseClient from "./createCourseClient";
import { getAllDepartments } from "@/actions/departments/getAllDepartments";
import { getCurrentUser } from "@/actions/users/currentUser";


const CreateCourse = async() => {
  const departments=await  getAllDepartments();
  const user=await getCurrentUser();
  const isDataAccessed=user?.permissions.some((permission)=>permission.permission.action === "CanManageOwnCourse"||permission.permission.action === "CanManageCourse" || permission.permission.action === "CanCreateCourse")

 
  if(!isDataAccessed || !user?.teacher || !user?.teacher.status){
    return null;
  }

 
  return (  <CreateCourseClient user={user} departments={departments}/>);
}
 
export default CreateCourse;