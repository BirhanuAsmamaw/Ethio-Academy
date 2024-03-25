import DeleteComponent from '@/components/deleteComponent'
import React from 'react'

const ExamTypeDelete = () => {
  return (<DeleteComponent onDelete={function (): void {
    throw new Error('Function not implemented.')
  } } title={'Delete This Exam type'} label={'Delete'}/>
  )
}

export default ExamTypeDelete