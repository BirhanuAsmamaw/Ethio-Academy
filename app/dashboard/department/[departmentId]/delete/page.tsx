import DeleteComponent from '@/components/deleteComponent'
import React from 'react'

const DeleteDepartment = () => {
  const onDelete = () => {};
  return (<DeleteComponent onDelete={onDelete} title={' Delete this Department'} label={'Delete'}/>
  )
}

export default DeleteDepartment