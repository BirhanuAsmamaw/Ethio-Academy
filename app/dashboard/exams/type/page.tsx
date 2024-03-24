import { getAllExamsCategory } from '@/actions/examsCategory/getAllExamsCategry';
import React from 'react'
import { ExamTypeClient } from './examTypeClient';

const ExamTypePage = async() => {
  const exams=await getAllExamsCategory();
  const selectedExams = exams&&exams?.map((exam)=>{
    return{
      id:exam.id, 
     department_no:exam.departments.length,
     name:exam.examType
    }
  })
  return ( <div className="px-4 py-10">
    <ExamTypeClient exams={selectedExams || null}/>
  </div> );
}

export default ExamTypePage