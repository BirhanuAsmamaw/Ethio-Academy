import React from 'react'
import UpdateDepartmentContent from './content'
import UpdateDepartmentFile from './file'
import { getDepartmentById } from '@/actions/departments/getDepartmentById'

const UpdateDepartment = async({params}:{params:{departmentId:string}}) => {
  const department=await getDepartmentById(params.departmentId)
  return (<div className="min-h-screen w-full flex justify-center items-center">

     <div className="w-full lg:w-10/12 lg:px-20 xl:8/12 flex flex-col gap-6 items-center">
      <UpdateDepartmentContent department={department}/>
      <UpdateDepartmentFile department={department}/>
     </div>
  </div>
  )
}

export default UpdateDepartment