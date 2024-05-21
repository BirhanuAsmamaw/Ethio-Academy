import React from 'react'
import CreateTeacher from './createTeacher'
import { getCurrentUser } from '@/actions/users/currentUser';

const InstructorPage = async() => {
  const user=await getCurrentUser();

  
  return (
    <div className='  w-full flex pt-20  md:pt-10 justify-center items-center'>
      <CreateTeacher user={user}/>
    </div>
  )
}

export default InstructorPage