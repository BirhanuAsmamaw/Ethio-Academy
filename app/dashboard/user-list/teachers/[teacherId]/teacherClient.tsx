"use client"

import { useInstructorStatusMutation } from '@/redux/features/instructors/instructorApi';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { IoMdAdd } from 'react-icons/io';
import { RiSubtractFill } from 'react-icons/ri';
interface TeacherClientProps{
teacher:any;

}
const TeacherClient:React.FC<TeacherClientProps> = ({teacher}) => {
 
  const [showReson,setShowReason]=useState(false)
  const [reason,setReason]=useState("")
const router=useRouter();

const [onApprove,{isError:appErr,isSuccess:appSuc,isLoading:appLoad}]=useInstructorStatusMutation()
const [onReject,{isError:rejectErr,isSuccess:rejectSuc,isLoading:rejectLoad}]=useInstructorStatusMutation()



useEffect(()=>{
  if(appSuc){
    toast.success("Instructor Approved Success! ")
    router.push("/dashboard/user-list/teachers")
    router.refresh()
  }
},[appSuc])




useEffect(()=>{
  if(rejectSuc){
    toast.success("Instructor Rejected Success! ")
    router.push("/dashboard/user-list/teachers")
    router.refresh()
  }
},[rejectSuc]);


// ERROR

useEffect(()=>{
  if(rejectErr){
    toast.error("Instructor Rejected error Occurred! please Try again! ")
    
  }
},[rejectErr]);

useEffect(()=>{
  if(appErr){
    toast.error("Instructor Approved error Occurred! please Try again!")

  }
},[appErr])







// APPROVED
  const onApproved=async() => {
    await onApprove({instructorId:teacher?.id,status:true,reason:reason})
  }

  // REJECT
  const onRejected=async() => {
    await onReject({instructorId:teacher?.id,status:false,reason:reason})
  }






  return (
    <div className='w-full flex-col p-2 h-screen flex items-center justify-center'>

      

<div className="relative  w-full md:max-w-2xl text-gray-500 border-2 bg-white dark:bg-gray-800 dark:text-gray-400 overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full  text-sm text-left 
    rtl:text-right ">
      <caption className="p-5 caption-top text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Verify the Instructor Account
        
        </caption>
        <tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700'>

          {/* User Name */}
            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                
                <th scope="col" className="px-6 py-3">
                User Name
                
                </th>
                <td scope="col" className="px-6 py-3">
                {teacher.user.name}
                
                </td>
                
            </tr>

            {/* Account Name */}
            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                
                <th scope="col" className="px-6 py-3">
                  Account  Name
                </th>
                <td scope="col" className="px-6 py-3">
                {teacher.accountName||teacher.user.name}
                </td>
                
            </tr>


            {/* //  Account Title */}
            {teacher.title?<tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                
                <th scope="col" className="px-6 py-3">
               Title
                </th>
                <td scope="col" className="px-6 py-3">
                   {teacher.title}
                </td>
                
            </tr>:""}



            {/* Description */}
            {teacher.description?<tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                
                <th scope="col" className="px-6 py-3">
                Description
                </th>
                <td scope="col" className="px-6 py-3">
                <div dangerouslySetInnerHTML={{__html:teacher.description}}/>
                </td>
                
            </tr>:""}
        </tbody>

        
        
    </table>

    {showReson?<div className="p-4">
    <input disabled={appLoad||rejectLoad} onChange={(event)=>setReason(event.target.value)} className=' p-2 w-full bg-slate-100 dark:bg-gray-900 border  focus:border-2 focus:dark:border-green-400 focus:border-blue-500  hover:dark:border-green-400 hover:border-blue-500 outline-none rounded-md ' placeholder='what reasons...'/>
    </div>:""}
    <div className='flex mt-4 p-4 w-full justify-end gap-4'>       
   
<button
disabled={appLoad||rejectLoad}
     onClick={()=>{
      setReason("")
      
      setShowReason((prev)=>!prev)
     }}
    className={`py-1 md:py-2 px-3 md:px-5 me-2 mb-2
text-sm font-medium text-gray-900 focus:outline-none
 bg-white rounded-full border border-gray-200 
 hover:bg-gray-100 hover:text-blue-700 focus:z-10 
 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700
  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
   dark:hover:text-white dark:hover:bg-gray-700 flex gap-2 items-center justify-center`}>
    {showReson? <RiSubtractFill size={24}/>:<IoMdAdd size={24}/>} <p>Reason</p></button>


    <button
    disabled={rejectLoad}
     onClick={onRejected}
    className={`py-1 md:py-2 px-3 md:px-5 me-2 mb-2
text-sm font-medium focus:outline-none
 rounded-full border focus:z-10 
 focus:ring-4 text-gray-50 bg-red-500 hover:bg-red-600 hover:text-white   focus:ring-red-500 dark:focus:ring-red-400   dark:border-red-400     border-red-500 
   flex gap-2 items-center justify-center`}>{rejectLoad? "Loading...":"Reject"}</button>



<button
    disabled={appLoad}
     onClick={onApproved}
    className={`py-1 md:py-2 px-3 md:px-5 me-2 mb-2
text-sm font-medium focus:outline-none
 rounded-full border focus:z-10 
 focus:ring-4 text-gray-50 bg-blue-500 hover:bg-blue-600 hover:text-white   focus:ring-blue-500 dark:focus:ring-blue-400   dark:border-blue-400     border-blue-500 
   flex gap-2 items-center justify-center`}>{appLoad?"Loading...":"Approve"}</button>


</div>
</div>

  </div>
  )
}

export default TeacherClient