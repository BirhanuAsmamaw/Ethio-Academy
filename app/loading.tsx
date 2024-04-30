import Navbar from '@/components/navbar/Navbar'
import ScaleLoading from '@/components/scaleLoading'
import React from 'react'

const LoadingPage = () => {
  return (<>  <Navbar/><div className=' h-screen w-full flex justify-center items-center'>


    <div className="">
      <ScaleLoading/>
    </div>
  </div>
  </>
  )
}

export default LoadingPage