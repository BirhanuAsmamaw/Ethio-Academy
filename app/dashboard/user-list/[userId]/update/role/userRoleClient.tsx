"use client"

import React from 'react'
import AssignPermissions from '../../assign/assignPermissions';
import AssignPermissionLists from '../../assign/assignPermissionLists';
import AssignRoles from '../../assign/assignRoles';
import AssignRoleLists from '../../assign/assignRoleLists';


interface UpdateUserRoleClient{
  user:any;
  permissions:any[]|null;
  roles:any[]|null;
}
const UpdateUserRoleClient:React.FC<UpdateUserRoleClient> = ({user,permissions,roles}) => {
  

  
  
  return (<div className="w-full min-h-screen flex justify-center items-center">
    <div className=" w-full md:w-3/4   lg:w-3/5  xl:w-1/2 bg-white dark:bg-black shadow  dark:shadow-black">
  <div className="flex p-4 border-b-2  dark:border-gray-700 justify-center">
  <h6 className=' leading-6 font-xl font-semibold'>{user?.name}</h6>
  </div>
   <div className='w-full  grid grid-cols-2'>

 <div className="w-full space-y-6  text-center border-r dark:border-gray-700 p-4">
 <AssignPermissions permissions={permissions||null} userId={user.id}/>
  <AssignPermissionLists permissions={[]}/>
 </div>



 <div className="w-full space-y-6  text-center dark:border-gray-700 border-l p-4">
  <AssignRoles roles={roles} userId={user.id}/>
  <AssignRoleLists roles={user?.roles}/>
 </div>

    </div>
 </div>
  </div>
  )
}

export default UpdateUserRoleClient
