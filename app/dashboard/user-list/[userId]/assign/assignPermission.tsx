
import React from 'react'
import AssignPermissions from './assignPermissions';
import AssignPermissionLists from './assignPermissionLists';
import AssignRoleLists from './assignRoleLists';
import AssignRoles from './assignRoles';
const AssignPermission = () => {
 

  
  return (<div className=" w-full md:w-3/4   lg:w-3/5  xl:w-1/2 bg-white dark:bg-gray-800  shadow  dark:shadow-black">
    <div className="flex p-4 border-b-2  dark:border-gray-700 justify-center">
    <h6 className=' leading-6 font-xl font-medium'>Deribew Shimelis</h6>
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
  )
}

export default AssignPermission