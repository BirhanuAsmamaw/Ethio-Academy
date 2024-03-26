"use client"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useState } from 'react'


interface UpdateUserRoleClient{
  user:any;
}
const UpdateUserRoleClient:React.FC<UpdateUserRoleClient> = ({user}) => {

  const [userRole,setUserRole]=useState(user.role)
  return (<div className='w-full h-screen flex justify-center items-center p-2'>

    <div className="w-full md:w-[400px] bg-white drop-shadow-sm shadow-md p-4 space-y-2">
      <p>Update the Role of <span className='font-semibold'>{user.name}</span></p>

      <Select
      defaultValue={userRole}
           onValueChange={
            (value)=>setUserRole(value)
          }>
      <SelectTrigger  className="w-[180px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
        <SelectValue  placeholder="Select User Role" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
        <SelectGroup>
          <SelectLabel>Select User Role</SelectLabel>
        
      <SelectItem className="w-full hover:bg-gray-200  hover:dark:bg-gray-600"  value="USER">User</SelectItem >
      <SelectItem className="w-full hover:bg-gray-200  hover:dark:bg-gray-600"  value="ADMIN">Admin</SelectItem >
       
          
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>

    </div>
  )
}

export default UpdateUserRoleClient