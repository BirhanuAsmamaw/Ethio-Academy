import React from 'react'
import { CourseListClient } from './courseListClient'
import { getMyCourses } from '@/actions/courses/getMyCourse'

const CoursePage = async() => {
  const courses=await getMyCourses()
  return ( <CourseListClient courses={courses}/>)
 
}

export default CoursePage