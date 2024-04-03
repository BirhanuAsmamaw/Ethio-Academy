import React from 'react'
import EditQuestionContent from './content'
import EditQuestionFile from './file'
import { getQuestionById } from '@/actions/questions/getQuestionById'

const EditQuestion = async({params}:{params:{questionId:string}}) => {
  const question=await getQuestionById(params.questionId)
  return (<div className="min-h-screen w-full flex justify-center items-center">

     <div className="w-full lg:w-11/12 xl:px-20 xl:8/12 flex flex-col gap-6 items-center">
      <EditQuestionContent question={question}/>
      <EditQuestionFile question={question}/>
     </div>
  </div>
  )
}

export default EditQuestion