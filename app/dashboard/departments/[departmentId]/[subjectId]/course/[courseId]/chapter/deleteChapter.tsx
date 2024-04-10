"use client"
import Button from '@/components/button/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
interface DeleteChapterProps{
  chapterId: string
}
const DeleteChapter:React.FC<DeleteChapterProps> = ({chapterId}) => {
const [isLoading,setLoading]=useState(false)
const router=useRouter();
  const onSubmit=()=>{
    setLoading(true);
    axios.delete(`/api/chapter/${chapterId}/delete`).then(()=>{
      toast.success("Chapter deleted successfully")
      router.refresh()
      
    }).catch((errors)=>{
      toast.error("something went wrong");
    }).finally(()=>{
      setLoading(false);
    });
   
  
  }
  return (<div className="py-6 md:p-6 flex w-full justify-center gap-1">
      
  <div className="w-full px-6  py-4 lg:w-8/12 space-y-4 bg-slate-100 dark:bg-slate-900">
    <p className='text-sm backdrop:md'>Are You Sure To Delete This Chapter?</p>
    <div className="w-full flex justify-end">
  <Button onClick={onSubmit} title={isLoading? "Loading...":"Delete"} isDisabled={isLoading}/>
    </div>
    </div>
  </div>
  )
}

export default DeleteChapter