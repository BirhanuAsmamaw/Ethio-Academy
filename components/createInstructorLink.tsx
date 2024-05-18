import Link from 'next/link';
import React from 'react'
import { FaChalkboardTeacher } from 'react-icons/fa';
import { TbArrowNarrowRight } from 'react-icons/tb';

const CreateInstructorLink = () => {
  return ( <Link href="/dashboard/instructor" className="px-3 py-2 shadow-sm border-2 border-blue-600 shadow-blue-600 gap-2 hover:scale-105 no-underline hover:bg-blue-700 hover:font-medium  items-center leading-6  rounded-full text-center text-white flex  justify-center bg-blue-600 transition-all duration-300">
  <FaChalkboardTeacher size={20}/>
  <span className="truncate">Join as Instructor</span>
  <TbArrowNarrowRight size={20}/>
   </Link>
  )
}

export default CreateInstructorLink;