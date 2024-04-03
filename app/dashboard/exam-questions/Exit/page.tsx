import { getDepartmentByExamType } from '@/actions/departments/getDepartmentByExamType'
import Navbar from '@/components/navbar/Navbar'
import React from 'react'

import Header from '@/components/Header'
import ExitQuestionClientPage from './ExitExamsQuestionClient'

const ExitExamPage = async() => {
  const departments = await getDepartmentByExamType("Exit")
  return (<>
   <Header
    title={`Ethiopian University Exit Exams`}
    description={`Exit  Exams  || All Exit  Exams   With Answer and  Detail Exaplanations!`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>
  
  <ExitQuestionClientPage departments={departments||[]}/>
  </>
  )
}

export default   ExitExamPage