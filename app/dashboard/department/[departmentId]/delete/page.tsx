import DeleteComponent from '@/components/deleteComponent'
import React from 'react'

const DeleteDepartment = () => {
  return (<DeleteComponent onDelete={function (): void {
    throw new Error('Function not implemented.')
  } } title={' Delete this Department'} label={'Delete'}/>
  )
}

export default DeleteDepartment