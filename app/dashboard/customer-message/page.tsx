"use client"
import React, { useEffect, useState } from 'react'
import { CustomerMessageClient } from './customerMessageClient'
import axios from 'axios'


const CustomerMessage = () => {
  const [customerData,setCustomerData]=useState<any[]>([])

  useEffect(() => {
    axios.get("/api/contact/list").then((res) => {
      setCustomerData(res.data);
    });
  }, []);
 
  return (<CustomerMessageClient customerData={customerData}/>
   
  )
}

export default CustomerMessage
