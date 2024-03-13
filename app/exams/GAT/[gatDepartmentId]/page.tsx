import React from 'react'
import GATDepartmentClient from './gatDepartmentClient'
import { getDepartmentById } from '@/actions/departments/getDepartmentById'
import Navbar from '@/components/navbar/Navbar'
import { getCurrentUser } from '@/actions/users/currentUser'

const GATExamDepartment = async({params}:{params:{gatDepartmentId:string}}) => {
  const department=await getDepartmentById(params.gatDepartmentId)
  const user=await getCurrentUser();
  const isCourseDepartment=user?.payedCourses.some((payedCourse) =>payedCourse.department?.departmentName===department?.departmentName&&payedCourse?.status);
  return (<>
  <Navbar/>
  <GATDepartmentClient department={department} isCourseDepartment={isCourseDepartment}/>
  </>
  )
}

export default GATExamDepartment