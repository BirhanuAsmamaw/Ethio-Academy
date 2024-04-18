import React from 'react'
import CreatePermission from './createPermission'
import CreateRole from './createRole'
import { PermissionsListClient } from './permissionList'
import { getAllPermission } from '@/actions/authorization/getAllPermission'
import { getAllRoles } from '@/actions/authorization/getAllRole'
import { RolesListClient } from './rolesList'

const PermissionPage = async() => {

const permissions = await getAllPermission()
const roles=await getAllRoles()
  return (<div className='w-full   min-h-screen  grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:gap-6 xl:gap-10 '>


{/* PERMISSION */}
  <div className="relative flex justify-center">

    <div className="w-full md:w-4/12   h-[500px] bg-violet-400 md:fixed  overflow-y-auto ">
     <div className="w-full p-4 shadow-md  dark:shadow-black bg-white dark:bg-gray-800 py-6 flex flex-col justify-center items-center gap-20 border dark:border-gray-700 ">
     <CreatePermission/>
     <PermissionsListClient permissions={permissions}/>

      
      
        </div>
    </div>
  </div>



{/* ROLE */}

  <div className="relative flex justify-center ">
  <div className="w-full md:w-4/12    md:fixed h-[500px] bg-green-400 overflow-y-auto   ">
  <div className="p-4 flex flex-col justify-center items-center gap-20 bg-white dark:bg-gray-800 py-6 shadow-md dark:shadow-black border dark:border-gray-700 ">
  
   <CreateRole/>
   <RolesListClient roles={roles}/>


      </div>
    </div>
    </div>
  </div>
  )
}

export default PermissionPage