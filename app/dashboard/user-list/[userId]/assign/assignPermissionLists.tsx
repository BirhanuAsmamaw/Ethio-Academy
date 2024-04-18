"use client"
import React from 'react'

import { RxCross1 } from 'react-icons/rx'
import{motion} from "framer-motion"
import { Badge } from '@/components/ui/badge'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface AssignPermissionListsProps{
  permissions: any[];
}
const AssignPermissionLists:React.FC<AssignPermissionListsProps> = ({permissions}) => {
  

const router=useRouter();
  const onRemove=(id:string)=>{
  console.log("permissionId: " + id);
    axios.delete(`/api/authorization/userPermission/delete/${id}`).then(()=>{
        toast.success("Permission deleted successfully")
        router.refresh()

      }).catch((error)=>{
        toast.error("Error in delete of permission")
      }).finally(()=>{ })

  }
if(!permissions?.length){
  return <div className="">No Permissions found!!</div>
}
  return (<div className="flex  mt-3 gap-3 flex-wrap">
  
 {permissions?.map((permission,index) =>{
return  <motion.div
key={index}
whileInView={{opacity: 1}}
whileTap={{opacity: 0,translateY:-8}}
 className=""><Badge  onClick={()=>{onRemove(permission.permission.id)}} variant="secondary">{permission.permission.action} <RxCross1 className='h-4 w-4 ml-2 '/> </Badge>
 </motion.div>
 })}
  
</div>
  )
}

export default AssignPermissionLists