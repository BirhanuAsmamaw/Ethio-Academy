import React from 'react'

import { getDepartmentById } from '@/actions/departments/getDepartmentById'


import Header from '@/components/Header'
import DepartmentClient from './deprtmentClient'


const ExitExamDepartment = async({params}:{params:{departmentId:string}}) => {
  const department=await getDepartmentById(params.departmentId)
  
 


  return (<>
   <Header
    title={`${department?.departmentName}`}
    description={` ${department?.departmentName}`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>

  <DepartmentClient department={department} />
  </>
  )
}

export default ExitExamDepartment