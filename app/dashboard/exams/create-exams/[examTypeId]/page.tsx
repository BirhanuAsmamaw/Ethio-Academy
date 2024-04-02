import { getExamTypeById } from '@/actions/examsCategory/getExamTypeById'
import React from 'react'
import { DepartmentClient } from './departmentListClient'

const ExamTypeQuestion = async({params}:{params:{examTypeId:string}}) => {
  const exam=await getExamTypeById(params.examTypeId)
  return (<DepartmentClient departments={exam?.departments|| null}/>)
}

export default ExamTypeQuestion