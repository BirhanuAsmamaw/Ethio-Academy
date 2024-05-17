"use client"
import { RooState } from '@/redux/store'
import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'

const NavigationWrap = ({children}:{children:ReactNode}) => {
  const isScroll=useSelector((state:RooState)=>state.navigation.isScroll)
  return (<>{isScroll?<div>{children}</div>:""}</>
  )
}

export default NavigationWrap