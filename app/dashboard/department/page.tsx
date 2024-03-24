import { getAllDepartments } from '@/actions/departments/getAllDepartments';
import React from 'react'
import { DepartmentClient } from './departmentClient';

const DepartmentPage = async() => {
  const departments=await getAllDepartments();
  const selectedDepartments = departments&&departments?.map((department)=>{
    return{
      id:department.id, 
      examType:department.exam.examType,
     name:department.departmentName
    }
  })
  return ( <div className="px-4 py-10">
    <DepartmentClient departments={selectedDepartments}/>
  </div> );
}

export default DepartmentPage