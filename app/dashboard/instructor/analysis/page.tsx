"use client"
import DashboardCard from '@/components/card/summaryCard'
import React from 'react'
import { IoIosPricetags } from "react-icons/io";
import { FaPeopleRoof } from "react-icons/fa6";
import { SiCoursera } from "react-icons/si";
import { useInstructorSummaryQuery } from '@/redux/features/instructors/instructorApi';

const InstructorAnalysisPage = () => {

  const {data,isSuccess,isLoading,error}= useInstructorSummaryQuery();
  console.log(" dashboard",data)
  console.log(" dashboard Error",error)
  return (
    <div className='min-h-screen w-full justify-center pt-20'>
      <div className=" flex flex-col gap-y-10 lg:gap-y-20">


{/* Card List */}
        <div className=" flex flex-wrap gap-6 justify-center w-full">
        <DashboardCard className='w-[300px] truncate' label={'Learners'} content={isSuccess&&data?.learners} icon={FaPeopleRoof } />
        <DashboardCard className='w-[300px] truncate' label={'Courses'} content={isSuccess&&data?.courses} icon={SiCoursera} />
        <DashboardCard className='w-[300px] truncate' label={'Total Price'} content={isSuccess&&data?.price} icon={IoIosPricetags} />
        </div>



        {/* Table List */}
        <div className=" flex flex-wrap gap-6 justify-center w-full">


          {/* COURSES lIST */}
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
    <thead className="bg-gray-50 dark:bg-gray-700">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Course
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Price (ETB)
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Learners
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Bought Price (ETB)
        </th>
      </tr>
    </thead>
    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
          Biology
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          1022
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          23
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          2722
        </td>
      </tr>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
          Biology
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          1022
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          23
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          2722
        </td>
      </tr>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
          Biology
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          1022
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          23
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          2722
        </td>
      </tr>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
          Biology
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          1022
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          23
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          2722
        </td>
      </tr>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
          Biology
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          1022
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          23
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          2722
        </td>
      </tr>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
          Biology
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          1022
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          23
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          2722
        </td>
      </tr>
    
    </tbody>
  </table>
</div>




{/* STUDENTS LIST */}
<div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
    <thead className="bg-gray-50 dark:bg-gray-700">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Student
        </th>
        
        
        <th scope="col" className="px-6 py-3 dark:text-gray-400 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Bought Price (ETB)
        </th>
      </tr>
     
     
    
    </thead>

    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
          Deribew Shimelis
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          1022
        </td>
       
      </tr>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
          Deribew Shimelis
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          1022
        </td>
       
      </tr>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
          Deribew Shimelis
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          1022
        </td>
       
      </tr>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
          Deribew Shimelis
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
          1022
        </td>
       
      </tr>
    
    </tbody>
  </table>
</div>

        </div>




{/* Graph List */}
<div className=" flex flex-wrap gap-6 justify-center w-full">

</div>
      </div>
      </div>
  )
}

export default InstructorAnalysisPage