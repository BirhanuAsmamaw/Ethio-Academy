import React from 'react'

import { getDepartmentById } from '@/actions/departments/getDepartmentById'
import Navbar from '@/components/navbar/Navbar'
import { getCurrentUser } from '@/actions/users/currentUser'
import Header from '@/components/Header'
import ExitDepartmentQuestionClient from './ExitDepartmentQuestionClient'

const ExitExamDepartment = async({params}:{params:{departmentId:string}}) => {
  const department=await getDepartmentById(params.departmentId)
  const user=await getCurrentUser();
  const isCourseDepartment=user?.payedCourses.some((payedCourse) =>payedCourse.department?.departmentName===department?.departmentName&&payedCourse?.status);


  return (<>
   <Header
    title={`${department?.departmentName} Exit Exams`}
    description={` ${department?.departmentName} Exit  Exams  || All ${department?.departmentName}  Exit  Exams   With Answer and  Detail Exaplanations!`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>

  <ExitDepartmentQuestionClient department={department} isCourseDepartment={isCourseDepartment}/>
  </>
  )
}

export default ExitExamDepartment