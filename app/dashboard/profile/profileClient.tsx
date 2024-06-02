"use client"


import Spinning from "@/components/spinning";
import EditPassword from "./editPassword";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditName from "./editName";
import EditYourDepartment from "./editYourDepartment";
import EditYourDescription from "./editYourDescription";
import EnrolledCourses from "../../../components/userProfile/enrolledCourses";
import TeachingCourses from "../../../components/userProfile/teachingCourses";
import { formatDate } from "@/lib/formatDate";
import { GoDash } from "react-icons/go";
import Container from "@/components/container/container";
import { useEffect, useState } from "react";
import { useUpdateAccountTypeMutation} from "@/redux/features/user/userApi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UpdateUserNameClient from "./updateUserName";



interface ProfileClientProps{
  user:any;
}

const ProfileClient:React.FC<ProfileClientProps> = ({user}) => {


const router=useRouter()
  if(!user){
    return <div className="w-full  flex justify-center items-center">
      <Spinning/>
    </div>
  }
  

  const courses = user.payedCourses.flatMap((payedCourse: any) =>payedCourse?.courses?.flatMap((c:any)=>c.course)
);


  const names=user?.name.split(" ")

  
const [accountType,setAccountType]=useState(user?.accountType)
const [updateAccount,{isSuccess}]=useUpdateAccountTypeMutation()


if(isSuccess){
  router.refresh();
}
useEffect(()=>{
  if(isSuccess){
    router.refresh();
  }
   updateAccount(accountType)
},[accountType])


  return ( <div className="flex w-full justify-center">
  <div className='sm:p-4 w-full justify-center gap-x-4 py-6 lg:py-0 grid grid-cols-1 lg:grid-cols-12'>
    <div className="flex p-2 justify-end w-full lg:col-span-4">
      {user? (
        <Container className=" space-y-4">
          <div className="flex text-center items-center w-full justify-start gap-x-4">
          <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.image || "/"} alt="User Image" />
                  <AvatarFallback>
                    {names[0]?.[0]}{names[1]?.[0]}
                  </AvatarFallback>
                </Avatar>
            <div className=" w-full items-center text-left ">
            <p className='text-[16px] mb-0 p-0 w-full  truncate flex gap-2  justify-between items-center text-center sm:text-lg  lg:text-lg xl:text-xl font-medium tracking-tight !leading-tight '>
            <span> {user?.name}</span>
            <EditName user={user}/>
            </p>

            {/*  PROFILE Username*/}
            {user?.accountType==='PUBLIC'?<div className="flex gap-x-4 items-center">
            {user?.username?<Link target="_blank" href={`https://ethio-exams-academy.vercel.app/user/${user?.username}`} className="text-sm text-blue-500 dark:text-green-400 no-underline hover:underline">@{user?.username}</Link>:null}<UpdateUserNameClient user={user}/>
            </div>:""}
           <EditPassword user={user}/>
            </div>
          </div>
          {/* <div className="p-2">
            <p className='lg:text-lg font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>Contact Me</p>
            <div>
              {socialData.map((social, index) => (
                <SocialLink key={index} url={social.url} icon={social.icon} name={social.name} />
              ))}
            </div>
          </div> */}


          {user?.longestStreak?<div className="p-2">
            <p className='lg:text-[14px] uppercase font-semibold  '>
              My Streak
            </p>
            <div className="pl-2 space-y-2">
              

              {/* LONGEST STREAK */}
              <div className='text-[14px]'>
                <p className=" font-medium text-gray-700 dark:text-gray-300">Longest Streak: <span className=" font-medium text-blue-500 dark:text-green-500">{user?.longestStreak?.streak}</span></p> 
                <div className="flex items-center text-gray-500 dark:text-gray-400  text-[10px]  font-light font-serif">
             <span>{formatDate(user?.longestStreak?.startAt)} </span> 
             <GoDash size={20}/>
          <span>{formatDate(user?.longestStreak?.endAt)} </span>
       </div>
                </div>


                {/* CURRENT STREAK */}
                <div className='text-[14px]'>
                <p className=" font-medium text-gray-700 dark:text-gray-300">Current Streak: <span className=" font-medium text-blue-500 dark:text-green-500">{user?.currentStreak?.streak}</span></p> 
                <div className="flex items-center text-gray-500 dark:text-gray-400  text-[10px] font-light font-serif">
             <span>{formatDate(user?.currentStreak?.startAt)} </span> 
             <GoDash size={20}/>
          <span>{formatDate(user?.currentStreak?.endAt)} </span>
       </div>
                </div>
            </div>
          </div>:""}




          {/* Enrolled Courses */}
          {courses&&courses?.length?<div className="p-2">
            <p className='lg:text-[14px] uppercase font-semibold'>
              Enrolled Courses: <span className="  text-blue-500 dark:text-green-500">{courses?.length}</span>
            </p>
            <div className="pl-2">
              {/* <p className='text-[14px]'>Completed: <span>20</span></p> */}
              <p className='text-[14px]'>Ongoing: <span className=" font-medium text-blue-500 dark:text-green-500">{courses?.length}</span></p>
            </div>
          </div>:""}


          {/* <div className="p-2">
            <div className='lg:text-lg gap-2 flex font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>
              Exams Taken: <span>1</span>
            </div>
          </div> */}
          {user?.teacher&&user?.teacher?.courses?<div className="p-2">
            <div className='lg:text-[14px] uppercase font-semibold'>
              My Teaching Courses: <span className=" font-medium text-blue-500 dark:text-green-500">{user?.teacher?.courses?.length}</span>
            </div>
          </div>:""}


          {/* Account Type */}
          <div className="p-2">
  <p className='lg:text-[14px] uppercase font-semibold'>
    Account Type
  </p>
  <div className="pt-2 pl-2 space-y-2">

    {/* PRIVATE */}
    <div className="flex items-center gap-x-2">
      <button 
      onClick={()=>setAccountType('PRIVATE')}
      className={`
      h-4 w-4
       
        ${accountType==='PRIVATE'? 'border-[5px] border-blue-600 dark:border-green-400 ':'border-gray-400 dark:border-gray-600 border-[2px] '}
         rounded-full `}></button>
      <CiLock size={22}  className=" font-medium text-gray-700 dark:text-gray-300"/> 
      <div className="">
        <p  className=" font-medium text-gray-700 dark:text-gray-300">Private</p>
        <p className="text-gray-500 text-xs font-light dark:text-gray-500 tracking-tight">No one can access your profile.</p>
      </div>
    </div>

    {/* PUBLIC */}
    <div className="flex items-center gap-x-2">
      <button 
      onClick={()=>setAccountType('PUBLIC')}
      className={`
      h-4 w-4
      ${accountType==='PUBLIC'? 'border-[5px] border-blue-600 dark:border-green-400 ':'border-gray-400 dark:border-gray-600 border-[2px] '}
        rounded-full`}></button>
      <CiUnlock size={22}  className=" font-medium text-gray-700 dark:text-gray-300"/> 
      <div className="">
        <p  className=" font-medium text-gray-700 dark:text-gray-300">Public</p>
        <p className="text-gray-500 text-xs font-light dark:text-gray-500 tracking-tight">Anyone on the internet can see your profile.</p>
      </div>
    </div>
    
  </div>
</div>

        </Container>
      ) : null}




    </div>

    <div className="flex p-2 justify-end w-full lg:col-span-8">
      {user ? (
        <Container>
          <EditYourDepartment user={user}/>
          {/* About me */}
          <EditYourDescription user={user}/>
        
            {/* Enrolled Courses */}
            {user?.courseStreaks&&user?.courseStreaks?.length?<div className="mt-4 space-y-2">
            <h3 className='text-xl font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>Enrolled Courses</h3>
            <EnrolledCourses courses={user?.courseStreaks}/>
            </div>:""}
           



            {/* Exams Taken */}
            {/* <div className="p-2 sm:p-4  space-y-2">
            <h3 className='text-xl font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'> Exams Taken</h3>
            <p >Software Engineering Exit Exams</p>
            
          </div> */}


            {/* My Teaching Courses*/}
            { user?.teacher?.courses&& user?.teacher?.courses?.length?<div className="mt-4 space-y-2">
            <h3 className='text-xl font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>My Teaching Courses</h3>
            <TeachingCourses user={user}/>
            </div>:""}

        </Container>
      ) : null}
    </div>
  </div>
</div>);
}
 
export default ProfileClient;

