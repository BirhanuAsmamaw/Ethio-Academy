import { getExamTypeById } from '@/actions/examsCategory/getExamTypeById'
import React from 'react'
import { DepartmentClient } from './departmentListClient'

const ExamTypeQuestion = async({params}:{params:{examTypeId:string}}) => {
  const exam=await getExamTypeById(params.examTypeId)
  const departments=exam?.departments.map((department)=>{
    if(department.subject){
      department.subject.map((subject)=>{
        return{
          id: department.id,
          name:subject.subjectName
        }
      })
    }
    else{
      return{
        id: department.id,
        name:department.departmentName
      }
    }
  })
  return (<DepartmentClient departments={departments|| null}/>)
}

export default ExamTypeQuestion