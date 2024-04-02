
import Spinning from '@/components/spinning'
import React, { Suspense } from 'react'
import QuestionsClient from './questionClient'

const QuestionPage = async({params}:{params:{examTypeId:string;departmentId:string}}) => {
  return (<Suspense fallback={<div 
    className="h-screen w-full flex justify-center items-center  gap-1 text-xl">
      <Spinning/>
      <p>Searching...</p>
    </div>}>
      <QuestionsClient departmentId={params.departmentId}/>
      </Suspense> 
  )
}

export default QuestionPage