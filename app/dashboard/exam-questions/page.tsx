import React from 'react'
import ExamPageClient from './examPageClient'
import { getAllExamsCategory } from '@/actions/examsCategory/getAllExamsCategry'

const ExamQuestionPage = async() => {
  const exams=await getAllExamsCategory()
  return (<ExamPageClient exams={exams||null}/>
  )
}

export default ExamQuestionPage