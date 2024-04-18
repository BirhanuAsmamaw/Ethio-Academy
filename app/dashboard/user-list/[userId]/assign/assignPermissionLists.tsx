"use client"
import React from 'react'

import { RxCross1 } from 'react-icons/rx'
import{motion} from "framer-motion"
import { Badge } from '@/components/ui/badge'
const AssignPermissionLists = () => {
  const actionList = [
    {action: "CanDeleteUser"},
    {action: "CanCreateCourse"},
    {action: "CanUpdateBanner"},
    {action: "CanEditProfile"},
    {action: "CanViewDashboard"},
    {action: "CanSendMessage"},
    {action: "CanManageSettings"},
    {action: "CanApproveComments"}
];

  return (<div className="flex  mt-3 gap-3 flex-wrap">
  
 {actionList.map((action,index) =>{
return  <motion.div
key={index}
whileInView={{opacity: 1}}
whileTap={{opacity: 0,translateY:-8}}
 className=""><Badge variant="secondary">{action.action} <RxCross1 className='h-4 w-4 ml-2 '/> </Badge>
 </motion.div>
 })}
  
</div>
  )
}

export default AssignPermissionLists