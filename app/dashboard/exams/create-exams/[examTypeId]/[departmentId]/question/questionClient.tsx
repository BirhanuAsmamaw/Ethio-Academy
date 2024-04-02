"use client"

import { useSearchParams } from 'next/navigation'
import React from 'react'

const QuestionClient = () => {
  const searchParam=useSearchParams();
  const subject=searchParam?.get('subject')

  return (<div>QuestionClient of {subject? subject:"no subject"}</div>
  )
}

export default QuestionClient