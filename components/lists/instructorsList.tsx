"use client"
import { useInstructorlistsQuery } from '@/redux/features/instructors/instructorApi'
import React from 'react'
import AccountCard from '../card/accountCard';

const InstructorsList = () => {
  const {data,isLoading,error,isSuccess}=useInstructorlistsQuery();
 
  
  return (<section id='instructors' className='w-full bg-pink-50 py-20 md:py-32    relative  dark:bg-zinc-800 '>
  <div className="flex   justify-center  py-10">
    <div className="w-full lg:w-11/12 xl:px-20   space-y-4">

<h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double p-2 border-gray-200 dark:border-gray-700  text-gray-800 dark:text-gray-100 tracking-tight !leading-tight'>Top Instructors</h1>

<div className='grid  grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center flex-wrap gap-4 p-4 md:px-10'>
       {isSuccess&&data?.map((teacher)=>{
        return <AccountCard key={teacher.id} 
        title={teacher.title}
        name={teacher.
          accountName
          ||teacher.user.name} 
        url={`/instructor/${teacher.id} `}
        image={teacher.logo?.public_url||teacher.user.image}/>
       })}

      </div>
      </div>
    
</div>

</section>
  )
}

export default InstructorsList