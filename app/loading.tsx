import React from 'react'
import Loading from "../public/loading.gif"
import Image from 'next/image'
const LoadingPage = () => {
  return (<div className=' h-screen w-full flex justify-center items-center'>

    <div className="">
      <Image fill src={Loading} alt="loading...."/>
    </div>
  </div>
  )
}

export default LoadingPage