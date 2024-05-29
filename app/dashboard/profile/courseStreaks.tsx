"use client"
import { formatDate } from '@/lib/formatDate'
import React from 'react'
import { GoDash } from "react-icons/go";
const CoursesStreak = ({courses}:{courses:any[]}) => {
   



  return ( <>{courses&&courses?.length?<div className="p-2 sm:p-4  space-y-2">
  <h3 className='text-xl font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>Courses Streak</h3>
 

<div className="relative overflow-x-auto ">
<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
<tr>
  <th scope="col" className="px-6 py-3">
      Course Name
  </th>
 

<th scope="col" className="px-6 py-3 ">
      Start On
  </th>

  <th scope="col" className="px-6 py-3 text-center">
      Longest Streak
  </th>
  <th scope="col" className="px-6 py-3 text-center">
      Current Streak
  </th>
</tr>
</thead>
<tbody>
{courses?.length&&courses?.map((course:any)=>{
    return <tr key={course?.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-500">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
       {course?.course?.course}
    </th>
   
    <td className="px-6 py-4 ">
    {formatDate(course?.createdAt)} 
    </td>

<td className="px-6 py-2  ">
       <p className='text-xl  text-center font-medium text-green-600'>{course?.streak?.streak||0}</p>
       <div className="flex items-center justify-center text-[10px] font-light font-sans">
       <span>{formatDate(course?.streak?.startAt)} </span> 
       <GoDash size={20}/>
       <span>{formatDate(course?.streak?.startAt)} </span>
       </div>
    </td>

    <td className="px-6 py-2  ">
       <p className='text-xl text-center font-medium text-green-600'>{course?.streak?.streak||0}</p>
       <div className="flex items-center justify-center text-[10px] font-light font-sans">
       <span>{formatDate(course?.streak?.startAt)} </span> 
       <GoDash size={20}/>
       <span>{formatDate(course?.streak?.startAt)} </span>
       </div>
    </td>


   
  </tr>
})}

</tbody>
</table>
</div>

</div>:""}</>
  )
}

export default CoursesStreak