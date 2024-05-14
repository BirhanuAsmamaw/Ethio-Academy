import React from 'react'
import GoogleMapComponent from './googleMap'
import ContactForms from './ContactForms'

const Contact = () => {
  return (
    <section id='contact' className='py-20 grid w-full px-10 gap-8 bg-cyan-50 dark:bg-slate-900 grid-cols-1  md:grid-cols-2 lg:grid-cols-3'>
    
      <div className="w-full lg:col-span-2 flex justify-center h-full items-center">
        <ContactForms/>
      </div>
      <div className="w-full overflow-hidden col-span-1  ml-6 p-4">
        <GoogleMapComponent/>
      </div>
    </section>
  )
}

export default Contact