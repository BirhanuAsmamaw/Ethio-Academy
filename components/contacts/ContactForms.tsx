"use client"
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


const ContactForms = () => {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [message,setMessage]=useState("")
  const [isLoading,setLoading]=useState(false)

  const onSubmit=()=>{
    setLoading(true)
    axios.post("/api/contact",{name:name,email:email,message:message}).then(()=>{
      toast.success("Send Successfully")
    }).catch(()=>{
      toast.error("error occurred in send")
    }).finally(()=>{
      setLoading(false)
    })
  }
  return (<div className=" space-y-8 pb-10 md:pb-0 w-full lg:w-min px-4">
    <h1 className='w-full text-xl md:text-4xl font-semibold border-b-2 border-double p-2 border-gray-200 dark:border-gray-700  text-gray-800 dark:text-gray-100 tracking-tight !leading-tight'>Contact Us</h1>
  
    <form onSubmit={onSubmit} className="w-full md:w-[400px] p-6 items-start space-y-6 px-4">
      <div className="relative z-0 w-full mb-5 group">
    <input onChange={(event)=>setName(event.target.value)} name="floating_name" id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Name</label>
</div>


<div className="relative z-0 w-full mb-5 group">
    <input onChange={(event)=>setEmail(event.target.value)} type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
</div>


<div className="relative z-0 w-full mb-5 group">
    <textarea onChange={(event)=>setMessage(event.target.value)} rows={4}  name="floating_message" id="floating_message" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="floating_message" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Message</label>
</div>
<div className="w-full flex justify-end p-4">
  <button type='submit' className='rounded-full !py-1 !px-2.5 bg-blue-600 text-white hover:bg-blue-600'>Send</button>
</div>
    </form>
    </div>

  )
}

export default ContactForms
