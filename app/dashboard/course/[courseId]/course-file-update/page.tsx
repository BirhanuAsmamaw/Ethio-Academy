import React from 'react'
import CourseFileUpdateClient from './courseFileUpdateClient'
import { GetCourseById } from '@/actions/courses/getCourseById'

const CourseFileUpdate = async({params}:{params:{courseId:string}}) => {

  const course=await GetCourseById(params.courseId)
  return (<div className="w-full min-h-screen bg-white dark:bg-gray-800 ">
  <div className="flex items-center justify-center py-4">
    <CourseFileUpdateClient course={course}/>
    </div></div>
  )
}

export default CourseFileUpdate