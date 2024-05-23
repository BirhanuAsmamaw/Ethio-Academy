import { getCurrentUser } from '@/actions/users/currentUser';
import React from 'react'
import ProfileClient from './profileClient';
import Header from '@/components/Header';

const ProfilePage = async() => {
  const user=await getCurrentUser();

  if(!user) {
    return null;
  }
  
 
  return ( <>
  <Header
  keywords={`EthioAcademy, ${user?.name},${user?.teacher?user?.teacher?.accountName:""}student profiles, instructor profiles, top subjects, best course,subjects, most popular subjects, comprehensive learning`}
  description={`${user.description?user.description:'Discover comprehensive profiles of our top students and expert instructors, showcasing their skills, achievements, and contributions to the learning community.'}`}
  title={` ${user?.name}`}
/>

  <div className="w-full py-10 flex justify-center items-center">
    <ProfileClient user={user}/>
  </div></> );
}

export default ProfilePage