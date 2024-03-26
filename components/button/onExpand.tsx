"use client"
import React from 'react'
import { Button } from '../ui/button'
import { IoChevronDown, IoChevronUp } from 'react-icons/io5'

interface OnExpandProps{
  onExpand:() => void;
  isExpand:boolean;
}
const OnExpand:React.FC<OnExpandProps> = ({onExpand,isExpand}) => {
  return ( <Button 
    className="bg-black  hover:bg-opacity-20  bg-opacity-10 p-2"
    variant="outline" 
    onClick={onExpand}>{isExpand? <IoChevronUp size={30}/>:<IoChevronDown size={30}/>}</Button>
  )
}

export default OnExpand