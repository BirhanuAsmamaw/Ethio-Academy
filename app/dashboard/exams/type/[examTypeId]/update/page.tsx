import React from 'react'
import UpdateExamContent from './content'
import UpdateExamFile from './file'
import { getExamTypeById } from '@/actions/examsCategory/getExamTypeById'


const UpdateExam = async({params}:{params:{examTypeId:string}}) => {
  const Exam=await getExamTypeById(params.examTypeId)
  return (<div className="min-h-screen w-full flex justify-center items-center">

     <div className="w-full lg:w-11/12 xl:px-20 xl:8/12 flex flex-col gap-6 items-center">
      <UpdateExamContent exam={Exam}/>
      <UpdateExamFile exam={Exam}/>
     </div>
  </div>
  )
}

export default UpdateExam