import DeleteComponent from '@/components/deleteComponent'
import React from 'react'

const ExamTypeDelete = () => {
  const onDelete = () => {};
  return (<DeleteComponent onDelete={onDelete} title={'Delete This Exam type'} label={'Delete'}/>
  )
}

export default ExamTypeDelete