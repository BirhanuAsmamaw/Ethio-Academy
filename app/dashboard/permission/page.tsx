import React from 'react'
import CreatePermission from './createPermission'
import CreateRole from './createRole'

const PermissionPage = () => {


  return (<div className=' min-h-screen w-full flex  justify-center'>
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10">
     <CreatePermission/>
     <CreateRole/>

    </div>
    </div>
  )
}

export default PermissionPage