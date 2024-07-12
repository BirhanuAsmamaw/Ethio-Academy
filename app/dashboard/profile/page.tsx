"use client"
import React from 'react'
import ProfileClient from './profileClient';
import Header from '@/components/Header';
import { useMyProfileQuery } from '@/redux/features/user/userApi';
import { useMyAccountQuery } from '@/redux/features/instructors/instructorApi';

const ProfilePage = () => {
  const {data:user,isSuccess:userSucc}=useMyProfileQuery();
  const {data:teacher,isSuccess:teachSucc}=useMyAccountQuery();

  if(!user) {
    return null;
  }
  

  return ( <>
  <Header
  keywords={`EthioAcademy, ${user?.name},${teachSucc&&teacher?teacher?.accountName:""} student profiles, instructor profiles, top subjects, best course,subjects, most popular subjects, comprehensive learning`}
  description={`${user.description?user.description:'Discover comprehensive profiles of our top students and expert instructors, showcasing their skills, achievements, and contributions to the learning community.'}`}
  title={` ${user?.name}`}
/>

  <div className="w-full  py-9 lg:py-0 flex justify-center items-center">
    <ProfileClient user={userSucc&&user}/>
  </div></> );
}

export default ProfilePage