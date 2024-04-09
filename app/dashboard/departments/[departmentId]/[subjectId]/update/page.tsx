import { getSubjectById } from '@/actions/subject/getSubjectById'
import EditSubjectComponent from '@/components/edit-subject/EditSubject'
import React from 'react'

const UpdateSubjectPage = async({params}:{params:{subjectId:string}}) => {
  const subject =await getSubjectById(params.subjectId)
  return (<EditSubjectComponent subject={subject}/>
  )
}

export default UpdateSubjectPage