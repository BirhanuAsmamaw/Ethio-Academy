
import Spinning from '@/components/spinning'
import React, { Suspense } from 'react'
import QuestionsClient from './questionClient'

const QuestionPage = () => {
  return (<Suspense fallback={<div 
    className="h-screen w-full flex justify-center items-center  gap-1 text-xl">
      <Spinning/>
      <p>Searching...</p>
    </div>}>
      <QuestionsClient/>
      </Suspense> 
  )
}

export default QuestionPage