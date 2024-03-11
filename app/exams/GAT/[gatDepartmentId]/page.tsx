import React from 'react'
import GATDepartmentClient from './gatDepartmentClient'
import { getDepartmentById } from '@/actions/departments/getDepartmentById'
import Navbar from '@/components/navbar/Navbar'

const GATExamDepartment = async({params}:{params:{gatDepartmentId:string}}) => {
  const department=await getDepartmentById(params.gatDepartmentId)
  return (<>
  <Navbar/>
  <GATDepartmentClient department={department}/>
  </>
  )
}

export default GATExamDepartment