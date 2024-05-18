"use client"
import { useInstructorlistsQuery } from '@/redux/features/instructors/instructorApi'
import React from 'react'
import AccountCard from '../card/accountCard';
import CardSceleton from '../card/cardSceleton';

const InstructorsList = () => {
  const {data,isLoading,error,isSuccess}=useInstructorlistsQuery();
 
  
  return (<section id='instructors' className='w-full bg-pink-50 py-20 md:py-32    relative  dark:bg-zinc-800 '>
  <div className="flex   justify-center  py-10">
    <div className="w-full lg:w-11/12 xl:px-20   space-y-4">

<h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double p-2 border-pink-200 dark:border-gray-700  text-gray-800 dark:text-gray-200 tracking-tight !leading-tight'>Top Instructors</h1>

<div className='grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-center  gap-4 p-4 md:px-10'>
       {isSuccess?<>{data&&data.length?data?.map((teacher)=>{
        return <AccountCard key={teacher.id} 
        title={teacher.title}
        name={teacher.
          accountName
          ||teacher.user.name} 
        url={`/instructor/${teacher.id} `}
        image={teacher.logo?.public_url||teacher.user.image}/>
       }):
       <div className="w-full flex justify-center">
        <p className='text-lg md:text-xl'>No Instructors Found!!</p>
       </div>
       }</>:""}

       {isLoading?<>
       <CardSceleton/>
       <CardSceleton/>
       <CardSceleton/>
       
       </>:""}

      </div>
      </div>
    
</div>

</section>
  )
}

export default InstructorsList