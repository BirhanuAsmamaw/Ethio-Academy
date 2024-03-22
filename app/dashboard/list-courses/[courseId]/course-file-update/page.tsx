import React from 'react'

const CourseFileUpdate = ({params}:{params:{courseId:string}}) => {
  return (<div className="w-full min-h-screen bg-white dark:bg-gray-800 ">
  <div className="flex items-center py-4">
    <h2>get course by: {params.courseId}</h2>
    <h1>course cover</h1>
    <h1>course thumbail</h1>
    <h1>course Indroduction Video</h1>
    </div></div>
  )
}

export default CourseFileUpdate