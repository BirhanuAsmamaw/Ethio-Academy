"use client"
import DashboardCard from '@/components/card/summaryCard'
import { useUserListsQuery } from '@/redux/features/user/userApi'
import React from 'react'
import { BsPeople } from 'react-icons/bs'

const UsersAnalysis = () => {
  const {data:users,isSuccess,error,isLoading,isError}=useUserListsQuery({page:"",pageSize:""})

  return (
    <DashboardCard icon={BsPeople} content={`${isSuccess&&users?.totalUsers ||0 }`} label="Students"/>
  )
}

export default UsersAnalysis