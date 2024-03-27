import React from 'react'
import ExitDepartmentClient from './extiDepartmentClient'
import { getDepartmentById } from '@/actions/departments/getDepartmentById'
import Navbar from '@/components/navbar/Navbar'
import { getCurrentUser } from '@/actions/users/currentUser'
import Header from '@/components/Header'

const ExitExamDepartment = async({params}:{params:{exitDepartmentId:string}}) => {
  const department=await getDepartmentById(params.exitDepartmentId)
  const user=await getCurrentUser();
  const isCourseDepartment=user?.payedCourses.some((payedCourse) =>payedCourse.department?.departmentName===department?.departmentName&&payedCourse?.status);


  return (<>
   <Header
    title={`${department?.departmentName} Exit Exams`}
    description={` ${department?.departmentName} Exit  Exams  || All ${department?.departmentName}  Exit  Exams   With Answer and  Detail Exaplanations!`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>
  <Navbar/>
  <ExitDepartmentClient department={department} isCourseDepartment={isCourseDepartment}/>
  </>
  )
}

export default ExitExamDepartment