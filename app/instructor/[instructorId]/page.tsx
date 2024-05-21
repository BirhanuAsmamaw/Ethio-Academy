import { getTeacherById } from '@/actions/teacher/getTeacherById'
import Card from '@/components/card/card'
import Navbar from '@/components/navbar/Navbar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { EB_Garamond } from 'next/font/google'
import { PiStudentLight } from "react-icons/pi";
import { BsPeople } from "react-icons/bs";
import { SiBookstack } from "react-icons/si";
import ChannelVerfiedComponent from '@/components/ChannelVerfiedComponent'
import SubscriberAccount from './subscriberAccount'
import { getCurrentUser } from '@/actions/users/currentUser'
import InstructorNewCoursesList from './newCourseFlitered'
import InstructorOrderByRateCoursesList from './orderByRateCourseFlitered'
const eb_garamound= EB_Garamond({ subsets: ['latin'] ,weight:['400', '500','600','700']})
const InstructorPage = async({params}:{params:{instructorId:string}}) => {
  const teacher= await getTeacherById(params.instructorId)
  const user=await getCurrentUser();
  const names=teacher&&teacher?.user?.name?.split(" ")
  if(!teacher){
    return null;
  }
  return (<>
  <Navbar/>
       <div className="flex py-20 justify-center">
          <div className='flex flex-col items-center min-h-screen gap-20  p-4 w-full md:w-11/12 lg:w-10/12 xl:w-8/12 '>


         <div className=" bg-blue-600 p-4 flex-wrap text-white h-64  w-full rounded-[10px] flex justify-center md:justify-between items-center">
<div className="">
        
          <div className="flex flex-col md:flex-row text-center items-center w-full md:gap-10 ">
          <Avatar className={`${!teacher?.user?.image&&'hidden'}  h-24 w-24 `}>
      <AvatarImage src={teacher.logo? teacher?.logo.public_url: teacher.user?.image||""} alt="image" />
      <AvatarFallback>{names? names[0][0]:''}{names?names[1][0]:''}</AvatarFallback>
    </Avatar>
            <div className="mt-1">
              <div className='text-xl md:text-2xl  xl:text-3xl  tracking-tight font-semibold flex gap-x-2 w-full'><p>{teacher?.accountName? teacher?.accountName:teacher?.user?.name}</p> <ChannelVerfiedComponent/></div>
              {teacher?.title?<p className={`
              ${eb_garamound.className}
              text-base md:text-xl  xl:text-2xl  
                text-gray-200 font-medium text-left tracking-tight `}> {teacher?.title}</p>:""}

            </div>
          </div>
          <div className="mt-4 hidden md:block">

<ul className='flex  flex-row gap-x-2 w-full text-start items-start text-[16px] font-thin space-y-0 text-gray-300 list-none'>
<li className='flex gap-1'>
<SiBookstack size={20}/>
<span>{teacher?.course_no} courses</span>
</li>

<li className='flex gap-1'>
<PiStudentLight size={20}/>
<span>{teacher?.learner_no} learners</span>
</li>

<li className='flex gap-1'>
<BsPeople size={20}/>
<span>{teacher?.subscribe_no}  subscribers</span>
</li>


</ul>
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
<span>{teacher?.subscribe_no} subscribers</span>
</li>


</ul>
</div>
</div>
<div className="md:pr-10">
<SubscriberAccount accountId={teacher?.id||""} is_subscriber={teacher.is_subscriber||false} userId={user?.id||""}/>
</div>
         </div>


{/* COURSES */}
<InstructorOrderByRateCoursesList instructor={teacher}/>
<InstructorNewCoursesList instructor={teacher}/>


          </div>
       </div></>
  )
}

export default InstructorPage