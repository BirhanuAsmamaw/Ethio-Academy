import React from 'react'
import ExitDepartmentClient from './extiDepartmentClient'
import { getDepartmentById } from '@/actions/departments/getDepartmentById'
import Navbar from '@/components/navbar/Navbar'
import { getCurrentUser } from '@/actions/users/currentUser'

const ExitExamDepartment = async({params}:{params:{exitDepartmentId:string}}) => {
  const department=await getDepartmentById(params.exitDepartmentId)
  const user=await getCurrentUser();
  const isCourseDepartment=user?.payedCourses.some((payedCourse) =>payedCourse.department?.departmentName===department?.departmentName&&payedCourse?.status);


  return (<>
  <Navbar/>
  <ExitDepartmentClient department={department} isCourseDepartment={isCourseDepartment}/>
  </>
  )
}

export default ExitExamDepartment