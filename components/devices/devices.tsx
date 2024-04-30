import React from 'react'
import MobileComponent from './mobile'
import TabletComponent from './tablet'
import PcComponent from './pc'

const DevicesComponent = () => {
  return (<div className="dark:bg-[#211951] p-10 md:p-20 bg-[#5BBCFF]">
    <h1 className='text-xl lg:text-3xl leading-6 p-4 font-semibold'>Our website Access Easily By these devices</h1>

  <div className="w-full  flex justify-center">
  <div className="flex flex-wrap  justify-center gap-10 w-full md:w-10/12 lg:w-8/12 ">
        <MobileComponent/>
        <TabletComponent/>
        <PcComponent/>
    </div>
  </div>

  </div>
    
  )
}

export default DevicesComponent