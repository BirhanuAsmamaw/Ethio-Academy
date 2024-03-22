import React from 'react'
import CourseFileUpdateClient from './courseFileUpdateClient'

const CourseFileUpdate = ({params}:{params:{courseId:string}}) => {
  return (<div className="w-full min-h-screen bg-white dark:bg-gray-800 ">
  <div className="flex items-center justify-center py-4">
    <CourseFileUpdateClient courseId={params.courseId}/>
    </div></div>
  )
}

export default CourseFileUpdate