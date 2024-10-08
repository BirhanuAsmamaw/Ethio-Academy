"use client"
import { RemoveFile } from '@/actions/file/removeFile';
import CModal from '@/components/customModal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';
interface ClearcontentFileProps{
  content: any;
  departmentId: string;
  subjectId: string;
  courseId: string;
  chapterId: string;
  isAdd?:boolean;
}
const ClearContentImage:React.FC<ClearcontentFileProps> = ({isAdd,content,departmentId,subjectId,courseId,chapterId}) => {

  const [isLoading,setLoading]=useState(false)
  const router=useRouter();



  
  const onSubmit=()=>{
    setLoading(true);
  
    axios.put(`/api/content/${content.id}/update/file`,{image:null}).then(async()=>{
      if(content?.image){
        await RemoveFile(content.image.public_key);
      }
      
      router.push(`/dashboard/departments/${departmentId}/${subjectId}/course/${courseId}/chapter/${chapterId}/lesson/${content.lessonId}/update-content`)
      router.refresh();
      toast.success("content image deleted successfully")
      }).catch((error)=>{
    
        toast.error(error.message);
      }).finally(()=>{setLoading(false);});
   
  
  }


 
 
  
  return ( <CModal 
    variant="secondary"
title="Clear Content Image"
disabled={isLoading}
buttonLabel={isLoading? "Cleaning...":"Clear"}
onClick={onSubmit}
className=" rounded-none
   p-2"
modalName={<MdDelete size={18} 
className='text-gray-600
 dark:text-gray-400
 hover:text-gray-900
  hover:dark:text-gray-100 transition'/>}>
<div className="p-4">
<p className="p-4 text-lg">Are You Sure to Clear This Content Image?</p>
</div>
</CModal>
  
  
 
  )
}

export default ClearContentImage