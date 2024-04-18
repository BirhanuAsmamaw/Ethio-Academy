"use client"
import React from 'react'
import { RxCross1 } from 'react-icons/rx'
import{motion} from "framer-motion"
import { Badge } from '@/components/ui/badge'
const AssignRoleLists = () => {
  return (<div className="flex  mt-3 gap-3 flex-wrap">
  <motion.div
  initial={{opacity: 0}}
  whileInView={{opacity: 1}}
  whileTap={{opacity: 0,translateY:-100}}
  

   className=""><Badge>CanDeleteUser <RxCross1 className='h-4 w-4 ml-2 '/> </Badge></motion.div>
  <Badge>CanDeleteUser <RxCross1 className='h-4 w-4 ml-2 text-white'/> </Badge>
  <Badge>CanDeleteUser <RxCross1 className='h-4 w-4 ml-2'/></Badge>
  <Badge>CanDeleteUser <RxCross1 className='h-4 w-4 ml-2'/></Badge>
  <Badge>CanDeleteUser <RxCross1 className='h-4 w-4 ml-2'/> </Badge>
  <Badge>CanDeleteUser <RxCross1 className='h-4 w-4 ml-2'/></Badge>
  <Badge>CanDeleteUser <RxCross1 className='h-4 w-4 ml-2'/></Badge>
</div>
  )
}

export default AssignRoleLists