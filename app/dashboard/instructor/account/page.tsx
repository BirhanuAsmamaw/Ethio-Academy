"use client"
import React from 'react'
import { EB_Garamond } from 'next/font/google'
import { PiStudentLight } from "react-icons/pi";
import { BsPeople } from "react-icons/bs";
import { SiBookstack } from "react-icons/si";
import ChannelVerfiedComponent from '@/components/ChannelVerfiedComponent'
import { RxDashboard } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import ActionButton from '@/components/button/actionButton';
import AccountEdit from './accountEdit';
import InstructorCourseListClient from '../course/courseListClient';
import UpdateTeacherLogo from './updateTeacherLogo';
import Link from 'next/link';
import { useMyPermissionQuery } from '@/redux/features/permission/permissionApi';
import { useInstructorSummaryQuery, useMyAccountQuery } from '@/redux/features/instructors/instructorApi';
import { useMyProfileQuery } from '@/redux/features/user/userApi';


const eb_garamound= EB_Garamond({ subsets: ['latin'] ,weight:['400', '500','600','700']})
const AccountPage= () => {
  
  const {data:permissions,isSuccess:permSucc,isLoading:permLoad}=useMyPermissionQuery()
  const {data:teacher,isSuccess:teacherSucc,isLoading:teacherLoad}=useMyAccountQuery()
  const {data:summaryData,isSuccess:summarySucc,isLoading:summaryLoad}=useInstructorSummaryQuery();
  const {data:myProfile,isSuccess:profileSucc,isLoading:proLoad}=useMyProfileQuery();

  const isDataAccessed=permSucc&&permissions?.some((permission)=>permission?.action === "CanManageOwnCourse"||permission?.action === "CanManageCourse" || permission?.action === "CanCreateCourse")



  if(proLoad || teacherLoad || permLoad){
    return <div className="w-full h-screen flex justify-center items-center">
      <p>Loading...</p>
    </div>
  }
 
  if((!isDataAccessed)&&permSucc ){
    return null;
  }
  const names=teacher?.accountName?.split(" ");
  return (<>
  {profileSucc&&teacherSucc&&permSucc?
       <div className="flex py-20 lg:py-0 justify-center">
          <div className='flex flex-col items-center min-h-screen p-1 gap-20  w-full md:w-11/12 '>


         <div className=" bg-blue-600 p-4 relative flex-wrap text-white h-64   w-full rounded-[10px] flex justify-center sm:justify-between items-center">

          <Link href="/dashboard/instructor/analysis" className=' absolute top-3 right-3'><RxDashboard size={26} className=' font-extrabold text-white'/></Link>
<div className="">
        
          <div className="flex flex-col sm:flex-row text-center items-center w-full sm:gap-5 md:gap-10 ">
          <UpdateTeacherLogo user={myProfile} />
            <div className="mt-1">
              <div className='text-xl md:text-2xl  xl:text-3xl  tracking-tight font-semibold flex gap-x-2 w-full'><p>{teacher?.accountName? teacher?.accountName:name}</p> <ChannelVerfiedComponent/></div>
              {teacher?.title?<p className={`
              ${eb_garamound.className}
              text-base md:text-xl  xl:text-2xl  
                text-gray-200 font-medium text-left tracking-tight `}> {teacher?.title}</p>:""}

            </div>
          </div>
          <div className="mt-4 hidden md:block">

{summarySucc&&summaryData?<ul className='flex  flex-row gap-x-2 w-full text-start items-start text-[16px] font-thin space-y-0 text-gray-300 list-none'>
<li className='flex gap-1'>
<SiBookstack size={20}/>
<span>{summaryData?.courses_no} courses</span>
</li>
<li className='flex gap-1'>
<PiStudentLight size={20}/>
<span>{summaryData?.learners_no} learners</span>
</li>

<li className='flex gap-1'>
<BsPeople size={20}/>
<span>{summaryData?.subscribers_no} subscribers</span>
</li>


</ul>:""}
</div>



<div className="mt-2 md:hidden">

<ul className='flex  flex-row gap-x-2 w-full text-start items-start text-[12px] font-thin space-y-0 text-gray-300 list-none'>
<li className='flex gap-1'>
<SiBookstack size={16}/>
<span>{teacher?.course_no} courses</span>
</li>

<li className='flex gap-1'>
<PiStudentLight size={16}/>
<span>{teacher?.learner_no} learners</span>
</li>
<li className='flex gap-1'>
<BsPeople size={16}/>
<span>{teacher?.subscribe_no} subscribers </span>
</li>


</ul>
</div>
</div>


<div className=" flex flex-row md:flex-col gap-2 pt-1 items-center justify-center">
<AccountEdit user={myProfile}/>
{teacher?.status?<ActionButton url='/dashboard/instructor/course/add-course' label='Course' icon={IoMdAdd}/>:""}















</div>

         </div>


{/* COURSES */}
<InstructorCourseListClient instructor={teacher}/>



          </div>
       </div>:""}
       </>
  )
}

export default AccountPage