"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from './footer';

const FooterClient = () => {
    const pathName=usePathname();
  return ( <>
  {
   pathName?.startsWith('/dashboard')?"":<Footer/>}
  </>
  )
}

export default FooterClient