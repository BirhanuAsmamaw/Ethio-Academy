import CLink from '@/components/links/link'
import React from 'react'

const ErrorPage = () => {
  return (<div className='flex h-screen w-full justify-center items-center'>
    <div className="">
      <h1 className='text-lg font-bold'>Error Occured!</h1>
      <div className="p-2">
        <CLink pathName='' url='/' name='Back to Home Page'/>
      </div>
     
    </div>
  </div>
  )
}

export default ErrorPage