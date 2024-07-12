"use client"

import CreateCourseClient from "./createCourseClient";
import { useDepartmentListQuery } from "@/redux/features/department/departmentApi";
import { useMyPermissionQuery } from "@/redux/features/permission/permissionApi";
import { useMyProfileQuery } from "@/redux/features/user/userApi";


const CreateCourse = () => {
 
  const {data:user,isSuccess:userSucc}=useMyProfileQuery();
  const {data:permissions,isSuccess:permissionSucc}=useMyPermissionQuery();
  const isDataAccessed=permissionSucc&&permissions?.some((permission)=>permission?.action === "CanManageOwnCourse"||permission?.action === "CanManageCourse" || permission?.action === "CanCreateCourse")

  const {data:departments,isSuccess:deptSucc}=useDepartmentListQuery();

 
  if((!isDataAccessed)&&permissionSucc){
    return null;
  }

 
  return (  <CreateCourseClient user={userSucc&&user} departments={deptSucc?departments:[]}/>);
}
 
export default CreateCourse;