"use client"
import React from 'react'

const EnrolledCourses = ({user}:{user:any}) => {
    const courses = user.payedCourses.flatMap((payedCourse: any) =>payedCourse.courses.flatMap((c:any)=>c.course)
);


  return ( <div className="p-2 sm:p-4  space-y-2">
  <h3 className='text-xl font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>Enrolled Courses</h3>
 

<div className="relative overflow-x-auto ">
<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
<tr>
  <th scope="col" className="px-6 py-3">
      Course Name
  </th>
  {/* <th scope="col" className="px-6 py-3">
      Subject
  </th> */}
  {/* <th scope="col" className="px-6 py-3">
      Department
  </th> */}
  {/* <th scope="col" className="px-6 py-3">
      The Course given By
  </th> */}
  <th scope="col" className="px-6 py-3">
      status
  </th>
</tr>
</thead>
<tbody>
{courses.length&&courses?.map((course:any)=>{
    return <tr key={course?.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       {course?.course}
    </th>
    {/* <td className="px-6 py-4">
        Biology
    </td> */}
    {/* <td className="px-6 py-4">
        HighSchool
    </td> */}
    {/* <td className="px-6 py-4">
       Alpha Academy
    </td> */}
    <td className="px-6 py-4">
        ongoing
    </td>
  </tr>
})}

</tbody>
</table>
</div>

</div>
  )
}

export default EnrolledCourses