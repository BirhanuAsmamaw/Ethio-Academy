
import React from 'react'

import Header from '@/components/Header'
import DepartmentsListClientPage from './departmentListClient'
import { getAllDepartments } from '@/actions/departments/getAllDepartments'


const ExitExamPage = async() => {
  const departments = await getAllDepartments()
  return (<>
   <Header
    title={`Ethiopian University Exit Exams`}
    description={`Exit  Exams  || All Exit  Exams   With Answer and  Detail Exaplanations!`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>
  
  <DepartmentsListClientPage departments={departments||[]}/>
  </>
  )
}

export default   ExitExamPage