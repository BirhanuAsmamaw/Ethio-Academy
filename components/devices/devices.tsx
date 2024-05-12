import React from 'react'
import MobileComponent from './mobile'
import TabletComponent from './tablet'
import PcComponent from './pc'

const DevicesComponent = () => {
  return (<section className="dark:bg-[#211951] p-10 md:px-20 md:py-32 bg-sky-100">
    <h1 className='text-xl pb-20 lg:text-3xl leading-6 p-4 font-semibold'>Our website Access Easily By these devices</h1>

  <div className="w-full  flex justify-center">
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