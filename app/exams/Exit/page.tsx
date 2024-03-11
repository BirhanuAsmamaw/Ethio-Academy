import { getDepartmentByExamType } from '@/actions/departments/getDepartmentByExamType'
import Navbar from '@/components/navbar/Navbar'
import React from 'react'
import ExitClientPage from './exitClientPage'

const ExitExamPage = async() => {
  const departments = await getDepartmentByExamType("Exit")
  return (<>
  <Navbar/>
  <ExitClientPage departments={departments||[]}/>
  </>
  )
}

export default ExitExamPage