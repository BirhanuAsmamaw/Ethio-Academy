import { getDepartmentByExamType } from '@/actions/departments/getDepartmentByExamType'
import Navbar from '@/components/navbar/Navbar'
import React from 'react'
import GATClientPage from './GATClientPage'
import Header from '@/components/Header'


const GATExamPage = async() => {
  const departments = await getDepartmentByExamType("GAT")
  return (<>
   <Header
    title={`Ethiopian University GAT Exams`}
    description={`GAT  Exams  || All GAT  Exams   With Answer and  Detail Exaplanations!`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, GAT Exams, Online Education, Lifelong Learning'
/>
  <Navbar/>
  <GATClientPage departments={departments||[]}/>
  </>
  )
}

export default GATExamPage