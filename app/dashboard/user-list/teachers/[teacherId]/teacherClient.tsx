"use client"

import Button from '@/components/button/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
interface TeacherClientProps{
teacher:any;
permission:any;
}
const TeacherClient:React.FC<TeacherClientProps> = ({teacher,permission}) => {
  const [isLoading,setLoading]=useState(false)
const router=useRouter();
  const onApproved=() => {
    setLoading(true)
    axios.put(`/api/teacher/${teacher.id}/approve`,{status:true}).
    then(() => {
      axios.post("/api/authorization/userPermission",{userId:teacher?.user.id,
        permissionId:permission?.id})
        toast.success(`Approved successfully `);
      router.push("/dashboard/user-list/teachers")
    }).
    catch((err:any) => {
      toast.error(err?.message)
    }).
    finally(() => {
      setLoading(false);
    })
  }



  return (
    <div className='w-full h-screen flex items-center justify-center'>
    <div className="space-y-4 p-4 shadow-sm bg-white dark:bg-black">
      <p>Are You Approved {teacher?.user.name} ?</p>
      <Button onClick={onApproved} isDisabled={isLoading} title={isLoading?"Loading...":"Approve"}/>
    </div>
  </div>
  )
}

export default TeacherClient