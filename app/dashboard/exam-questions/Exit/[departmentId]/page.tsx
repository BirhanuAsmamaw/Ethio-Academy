import React from 'react'

import { getDepartmentById } from '@/actions/departments/getDepartmentById'


import Header from '@/components/Header'
import ExitDepartmentQuestionClient from './ExitDepartmentQuestionClient'

const ExitExamDepartment = async({params}:{params:{departmentId:string}}) => {
  const department=await getDepartmentById(params.departmentId)
  
 


  return (<>
   <Header
    title={`${department?.departmentName} Exit Exams`}
    description={` ${department?.departmentName} Exit  Exams  || All ${department?.departmentName}  Exit  Exams   With Answer and  Detail Exaplanations!`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>

  <ExitDepartmentQuestionClient department={department} />
  </>
  )
}

export default ExitExamDepartment