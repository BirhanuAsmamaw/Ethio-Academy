import React from 'react'

const NoCourseFound = ({title}:{title:string}) => {
  return (<div className="space-y-2 p-4  w-full col-span-full">
    <p className='md:text-lg'> <span className='font-medium'>Sorry!</span> The <span className='text-rose-600 dark:text-yellow-400 font-medium'>{title}</span> courses have not been posted yet. </p>
  </div>
  
  )
}

export default NoCourseFound