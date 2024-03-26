"use client"
import { RemoveFile } from '@/actions/file/removeFile'
import DeleteComponent from '@/components/deleteComponent'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


interface DeleteDepartmentClientProps{
  department: any;
}
const DeleteDepartmentClient:React.FC<DeleteDepartmentClientProps> = ({department}) => {
  const [isLoading,setLoading]=useState(false)
  const router=useRouter();
    const onSubmit=()=>{
      setLoading(true);
      axios.delete(`/api/department/${department.id}/delete`).then(async()=>{
        
        if(department.cover){
          await RemoveFile(department.cover.public_key);
        }
        
        toast.success("Department deleted successfully")
        router.refresh()
        
      }).catch((errors)=>{
        toast.error("something went wrong");
      }).finally(()=>{
        setLoading(false);
      });
     
    
    }
  return (<DeleteComponent onDelete={onSubmit} title={department.departmentName} />
  )
}

export default DeleteDepartmentClient