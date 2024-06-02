import { getTeacherById } from '@/actions/teacher/getTeacherById'

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
import Header from '@/components/Header'
import Container from '@/components/container/container'
const eb_garamound= EB_Garamond({ subsets: ['latin'] ,weight:['400', '500','600','700']})
const InstructorPage = async({params}:{params:{instructorId:string}}) => {
  const teacher= await getTeacherById(params.instructorId)
  const user=await getCurrentUser();
  const names=teacher&&teacher?.user?.name?.split(" ")
  if(!teacher){
    return null;
  }
  else{
  return (<>
  <Navbar/>
  <Header 
  keywords='learning, education, easy lessons, happy students, engaging content, expert teachers'
  description={`Join ${teacher?.accountName || teacher?.user?.name || ""} for engaging and easy-to-understand lessons that make learning a joy! Our expert instruction ensures you grasp concepts quickly and enjoy the process.`}
  title={`${teacher?.accountName || teacher?.user?.name || ""}`}
/>

       <div className="flex py-20 justify-center">
          <div className='flex flex-col items-center min-h-screen gap-20  p-4 w-full md:w-11/12 lg:w-10/12 xl:w-8/12 '>

          <Container className='!p-0 !px-0 overflow-hidden rounded-t-lg'>

         <div className=" bg-blue-600 w-full h-28 sm:h-32 md:h-36 xl:h-40 rounded-t-lg">
          </div>

 
        
       
            <div className=" ml-4 -mt-16 md:-mt-20  xl:-mt-24 ">
              <div className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 xl:h-36 xl:w-36 dark:bg-gray-800 bg-white p-1 rounded-full">
            <Avatar className={` h-full w-full  `}>
      <AvatarImage className=' ' src={teacher.logo? teacher?.logo.public_url: teacher.user?.image||""} alt="image" />
      <AvatarFallback className=' bg-gray-100 dark:bg-gray-700 '>{names? names[0][0]:''}{names?names[1][0]:''}</AvatarFallback>
    </Avatar>
    </div>
            
          </div>
            <div className="m-4">
              <div className='text-lg md:text-xl  xl:text-2xl  tracking-tight font-medium flex gap-x-2 w-full'><p>{teacher?.accountName? teacher?.accountName:teacher?.user?.name}</p> <ChannelVerfiedComponent/></div>
              {teacher?.title?<p className={`
              ${eb_garamound.className}
              text-base md:text-lg  xl:text-xl  
                text-gray-500 dark:text-gray-200 font-medium text-left tracking-tight `}> {teacher?.title}</p>:""}

            </div>


{/* DESCRIPTION */}
            {teacher?.description ? (
  <div className="m-4 border-y py-4 dark:border-gray-700">
    <div
      className="mt-2 text-gray-500 dark:text-gray-400 text-sm"
      dangerouslySetInnerHTML={{ __html: teacher.description }}
    />
  </div>
) : null}

          
          <div className="m-4 hidden md:block">

<ul className='flex  flex-row gap-x-2 w-full text-start items-start text-[16px] font-thin space-y-0 dark:text-gray-300 text-gray-600 list-none'>
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



<div className="m-4 md:hidden">

<ul className='flex  flex-row gap-x-2 w-full text-start items-start text-[12px] font-thin space-y-0 dark:text-gray-300 text-gray-600 list-none'>
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

<div className=" w-full flex justify-end m-4 pr-10">
<SubscriberAccount accountId={teacher?.id||""} is_subscriber={teacher?.is_subscriber||false} userId={user?.id||""}/>
</div>
         
         </Container>

{/* COURSES */}
<InstructorOrderByRateCoursesList instructor={teacher}/>
<InstructorNewCoursesList instructor={teacher}/>


          </div>
       </div></>
  )}
}

export default InstructorPage