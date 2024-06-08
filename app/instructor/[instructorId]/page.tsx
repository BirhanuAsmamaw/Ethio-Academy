
import Navbar from '@/components/navbar/Navbar'
import React from 'react'
import InstructorClientPage from './instructorClientPage'
const InstructorPage = ({params}:{params:{instructorId:string}}) => {

  return (<>
  <Navbar/>
  <InstructorClientPage instructorId={params.instructorId}/>
 </>
  )
}

export default InstructorPage