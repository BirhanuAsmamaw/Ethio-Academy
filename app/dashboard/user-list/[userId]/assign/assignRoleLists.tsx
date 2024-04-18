"use client"
import React from 'react'
import { RxCross1 } from 'react-icons/rx'
import{motion} from "framer-motion"
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

interface AssignRoleListsProps{
  roles:any[];
}
const AssignRoleLists:React.FC<AssignRoleListsProps> = ({roles}) => {

  const router=useRouter();
  const onRemove=(id:string)=>{
  
    axios.delete(`/api/authorization/userRole/${id}/delete`).then(()=>{
    
        toast.success("Role  deleted successfully")
        router.refresh()

      }).catch((error)=>{
        toast.error("Error in delete of Role ")
      }).finally(()=>{ })

  }
if(!roles?.length){
  return <div className="">No Roles found!</div>
}
  return (<div className="flex  mt-3 gap-3 flex-wrap">
  
 {roles.map((role,index) =>{
return  <motion.div
key={index}
whileInView={{opacity: 1}}
whileTap={{opacity: 0,translateY:-8}}
 className=""><Badge onClick={()=>{onRemove(role.role.id)}} variant="secondary">{role.role.name} <RxCross1 className='h-4 w-4 ml-2 '/> </Badge>
 </motion.div>
 })}
  
</div>
  )
}

export default AssignRoleLists