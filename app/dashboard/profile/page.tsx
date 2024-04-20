import { getCurrentUser } from '@/actions/users/currentUser';
import React from 'react'
import ProfileClient from './profileClient';

const ProfilePage = async() => {
  const user=await getCurrentUser();

  if(!user) {
    return null;
  }
  return ( <>
  <div className="min-h-screen w-full flex justify-center items-center">
    <ProfileClient user={user}/>
  </div></> );
}

export default ProfilePage