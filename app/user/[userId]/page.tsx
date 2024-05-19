import Navbar from '@/components/navbar/Navbar'
import React from 'react'
import UserProfileClient from './userProfileClient'

const UserProfile = ({params}:{params:{userId:string}}) => {
  return (<div>
  <Navbar/>
  <UserProfileClient userId={params.userId}/>
  </div>
   
  )
}

export default UserProfile