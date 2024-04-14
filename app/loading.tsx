import React from 'react'

import { ScaleLoader } from 'react-spinners'
const LoadingPage = () => {
  return (<div className=' h-screen w-full flex justify-center items-center'>

    <div className="">
    <ScaleLoader color="#36d7b7" />
    </div>
  </div>
  )
}

export default LoadingPage