"use client"
import React from 'react'
import { Button } from '../ui/button'
import {  IoChevronUp } from 'react-icons/io5'

interface OnExpandProps{
  onExpand:() => void;
  isExpand:boolean;
}
const OnExpand:React.FC<OnExpandProps> = ({onExpand,isExpand}) => {
  return ( <Button 
    className="bg-gray-700/5 text-gray-500 dark:text-gray-400 border-none shadow-sm dark:bg-gray-100/5 p-2"
    variant="outline" 
    onClick={onExpand}>{ <IoChevronUp size={30} className={`${!isExpand&&' -rotate-180'} transition duration-300`}/>}</Button>
  )
}

export default OnExpand