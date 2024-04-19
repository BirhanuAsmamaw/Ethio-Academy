import React from 'react'
import { CourseListClient } from './courseListClient'
import { getMyCourses } from '@/actions/courses/getMyCourse'
import { getCurrentUser } from '@/actions/users/currentUser'

const CoursePage = async() => {
  const courses=await getMyCourses()
  const user=await getCurrentUser();
  const isDataAccessed=user?.permissions.some((permission)=>permission.permission.action === "CanManageOwnCourse" || permission.permission.action === "CanViewOwnCourse")
  if(!isDataAccessed){
    return null;
  }
  return ( <CourseListClient courses={courses}/>)
 
}

export default CoursePage