import React from 'react'
import { CourseListClient } from './courseListClient'

import { getCurrentUser } from '@/actions/users/currentUser'

const CoursePage = async() => {
 
  const user=await getCurrentUser();
  
  const isDataAccessed=user?.permissions.some((permission)=>permission.permission.action === "CanManageOwnCourse" || permission.permission.action === "CanViewOwnCourse")

  if(!user?.teacher){
    return null;
  }

  if(!user?.teacher.status){
   return null;
  }

  if(!isDataAccessed){
    return null;
  }
  return ( <CourseListClient courses={user?.teacher?.courses}/>)
 
}

export default CoursePage