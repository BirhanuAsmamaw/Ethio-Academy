import React from 'react'
import UpdateUniversityContent from './content'
import UpdateUniversityFile from './file'
import { getUniversityById } from '@/actions/university/getUniversityById'



const UpdateUniversity = async({params}:{params:{universityId:string}}) => {
  const university=await getUniversityById(params.universityId)
  return (<div className="min-h-screen w-full flex justify-center items-center">

     <div className="w-full lg:w-11/12 xl:px-20 xl:8/12 flex flex-col gap-6 items-center">
      <UpdateUniversityContent university={university}/>
      <UpdateUniversityFile university={university}/>
     </div>
  </div>
  )
}

export default UpdateUniversity