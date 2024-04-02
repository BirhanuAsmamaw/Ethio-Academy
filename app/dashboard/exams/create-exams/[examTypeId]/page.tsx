import { getExamTypeById } from '@/actions/examsCategory/getExamTypeById'
import React from 'react'
import { DepartmentClient } from './departmentListClient'

const ExamTypeQuestion = async ({ params }: { params: { examTypeId: string } }) => {
  try {
    const exam = await getExamTypeById(params.examTypeId)
    const departments = exam?.departments.map((department) => {
      if (department.subject.length) {
        return department.subject.map((subject) => ({
          id: department.id,
          name: subject.subjectName,
          subject:subject.subjectName
        }))
      } else {
        return {
          id: department.id,
          name: department.departmentName,
          subject:null
        }
      }
    }).flat()

    return <DepartmentClient departments={departments || null} />
  } catch (error) {
    console.error('Error fetching exam:', error)
    return null
  }
}

export default ExamTypeQuestion
