import React from 'react'
import MobileComponent from './mobile'
import TabletComponent from './tablet'
import PcComponent from './pc'

const DevicesComponent = () => {
  return (<div className="dark:bg-black bg-white">
    <h1 className='text-lg font-semibold'>Devices </h1>

    <div className="flex flex-wrap gap-10">
        <MobileComponent/>
        <TabletComponent/>
        <PcComponent/>
    </div>

  </div>
    
  )
}

export default DevicesComponent