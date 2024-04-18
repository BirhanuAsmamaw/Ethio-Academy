import React from 'react'
import CreatePermission from './createPermission'
import CreateRole from './createRole'

const PermissionPage = () => {


  return (<div className='w-full  bg-slate-100 min-h-screen  grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:gap-6 xl:gap-10 '>


{/* PERMISSION */}
  <div className="relative flex justify-center">

    <div className="w-full md:w-5/12   md:fixed ">
     <div className="w-full p-4 shadow-md  dark:shadow-black bg-white py-6 flex flex-col justify-center items-center gap-20 border dark:border-gray-700 h-screen overflow-y-auto">
     <CreatePermission/>
      
      
        </div>
    </div>
  </div>



{/* ROLE */}

  <div className="relative flex justify-center ">
  <div className="w-full md:w-5/12    md:fixed  ">
  <div className="p-4 h-screen overflow-y-auto flex flex-col justify-center items-center gap-20 bg-white py-6 shadow-md dark:shadow-black border dark:border-gray-700 ">
  
   <CreateRole/>


      </div>
    </div>
    </div>
  </div>
  )
}

export default PermissionPage