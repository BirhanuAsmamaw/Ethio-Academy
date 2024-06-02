import Navbar from '@/components/navbar/Navbar'
import React from 'react'
import UserProfileClient from './userProfileClient'

const UserProfile = ({params}:{params:{username:string}}) => {
  return (<div>
  <Navbar/>

  <UserProfileClient username={params.username}/>
  </div>
   
  )
}

export default UserProfile