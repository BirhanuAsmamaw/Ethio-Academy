import { getDepartmentByExamType } from '@/actions/departments/getDepartmentByExamType'
import Navbar from '@/components/navbar/Navbar'
import React from 'react'
import GATClientPage from './GATClientPage'


const GATExamPage = async() => {
  const departments = await getDepartmentByExamType("GAT")
  return (<>
  <Navbar/>
  <GATClientPage departments={departments||[]}/>
  </>
  )
}

export default GATExamPage