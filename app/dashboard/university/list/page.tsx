import React from 'react'

import { getAllUniversity } from '@/actions/university/getAllUniversity'
import { UniversityListClient } from './universityListClient'

const UniversityList = async() => {
  const Universitys=await getAllUniversity()
  return (<div className="min-h-screen w-full flex justify-center items-center">

    <UniversityListClient university={Universitys}/>
  </div>
  )
}

export default UniversityList