import React from 'react'
import MobileComponent from './mobile'
import TabletComponent from './tablet'
import PcComponent from './pc'

const DevicesComponent = () => {
  return (<section className="dark:bg-[#211951] p-10 md:px-20 md:py-32 bg-sky-100">
   
    <h1 className='w-full tracking-tight  !leading-tight text-xl text-gray-800 dark:text-gray-100 md:text-4xl font-semibold border-b-2 border-double p-2  border-sky-300 dark:border-gray-700 pl-4'> Our website Access Easily By these Devices</h1>

  <div className="w-full  mt-32 flex justify-center">
  <div className="flex flex-wrap  justify-center gap-10 w-full md:w-10/12 lg:w-8/12 ">
        <MobileComponent/>
        <TabletComponent/>
        <PcComponent/>
    </div>
  </div>

  </section>
    
  )
}

export default DevicesComponent