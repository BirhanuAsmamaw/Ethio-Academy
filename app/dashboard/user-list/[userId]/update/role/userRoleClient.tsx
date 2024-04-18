"use client"
import Button from '@/components/button/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import AssignPermissions from '../../assign/assignPermissions';
import AssignPermissionLists from '../../assign/assignPermissionLists';
import AssignRoles from '../../assign/assignRoles';
import AssignRoleLists from '../../assign/assignRoleLists';


interface UpdateUserRoleClient{
  user:any;
}
const UpdateUserRoleClient:React.FC<UpdateUserRoleClient> = ({user}) => {
const [isLoading,setIsLoading]=useState(false)
  const [userRole,setUserRole]=useState(user.role)




  const router=useRouter()
  
  

  







  const onUpdateRole=async()=>{
    setIsLoading(true)
   
    
    axios.put(`/api/user/${user.id}/update/role`,{role:userRole}).then(()=>{
      toast.success("User Role updated successfully")
      router.push("/dashboard/user-list");
      router.refresh()

    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setIsLoading(false)
    });

  }


  
  
  return (<div className="w-full min-h-screen flex justify-center items-center">
    <div className=" w-full md:w-3/4   lg:w-3/5  xl:w-1/2 bg-white dark:bg-gray-800  shadow  dark:shadow-black">
  <div className="flex p-4 border-b-2  dark:border-gray-700 justify-center">
  <h6 className=' leading-6 font-xl font-semibold'>{user.name}</h6>
  </div>
   <div className='w-full  grid grid-cols-2'>

 <div className="w-full space-y-6  text-center border-r dark:border-gray-700 p-4">
 <AssignPermissions/>
  <AssignPermissionLists/>
 </div>

 <div className="w-full space-y-6  text-center dark:border-gray-700 border-l p-4">
  <AssignRoles/>
  <AssignRoleLists/>
 </div>

    </div>
 </div>
  </div>
  )
}

export default UpdateUserRoleClient
