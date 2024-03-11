import React from 'react'
import ExitDepartmentClient from './extiDepartmentClient'
import { getDepartmentById } from '@/actions/departments/getDepartmentById'
import Navbar from '@/components/navbar/Navbar'

const ExitExamDepartment = async({params}:{params:{exitDepartmentId:string}}) => {
  const department=await getDepartmentById(params.exitDepartmentId)
  return (<>
  <Navbar/>
  <ExitDepartmentClient department={department}/>
  </>
  )
}

export default ExitExamDepartment