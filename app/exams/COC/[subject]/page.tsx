
import { getSubjectById } from '@/actions/subject/getSubjectById'
import Header from '@/components/Header'
import Navbar from '@/components/navbar/Navbar'
import React from 'react'
import ExamSubjectClientPage from './cocSubjectClient'
import { getAllUniversity } from '@/actions/university/getAllUniversity'

const ExamSubjectPage = async({params}:{params:{subject:string}}) => {
  const subject=await getSubjectById(params.subject)
  const universities=await getAllUniversity()
 
  return (<>
  <Header
    title={`${subject?.subjectName} COC Exams`}
    description={` ${subject?.subjectName} COC Exams || All ${subject?.subjectName} Exams With Answer and  Detail Explanations!`}
    keywords='Programming, High School Courses, Freshman Courses, COC Exams, Exit Exams, Online Education, Lifelong Learning'
/>
  <Navbar/>
  <ExamSubjectClientPage subject={subject} universities={universities} />
  </>
    
  )
}

export default ExamSubjectPage