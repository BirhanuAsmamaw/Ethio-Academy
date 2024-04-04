import { getSubjectById } from '@/actions/subject/getSubjectById'
import EditSubjectComponent from '@/components/edit-subject/EditSubject'
import React from 'react'

const UpdateSubjectPage = async({params}:{params:{subject:string}}) => {
  const subject =await getSubjectById(params.subject)
  return (<EditSubjectComponent subject={subject}/>
  )
}

export default UpdateSubjectPage