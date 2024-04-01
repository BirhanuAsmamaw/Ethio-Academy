import { getQuestionsByCategory } from '@/actions/questions/getQuestionsByCategory'
import React from 'react'


interface QuestionsListProps{
  type: string;
  department: string;
  year: string;
  subject: string;
  isModel?:boolean

} 
const QuestionsList:React.FC<QuestionsListProps> = async({type,department,year,isModel,subject}) => {
  const questions = await getQuestionsByCategory(type, department, year, subject,isModel)
  return (<div>
    {
      questions.map((question) =>{
        return <div className="space-y-2" key={question.id}>{question.title}</div>
      })
    }
  </div>
  )
}

export default QuestionsList