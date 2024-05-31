"use client"


import Spinning from "@/components/spinning";
import EditPassword from "./editPassword";

import UserProfileContainer from "@/app/user/[userId]/userProfileContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import EditName from "./editName";
import EditYourDepartment from "./editYourDepartment";
import EditYourDescription from "./editYourDescription";
import EnrolledCourses from "./enrolledCourses";
import TeachingCourses from "./teachingCourses";
import CoursesStreak from "./courseStreaks";
import { formatDate } from "@/lib/formatDate";
import { GoDash } from "react-icons/go";



interface ProfileClientProps{
  user:any;
}

const ProfileClient:React.FC<ProfileClientProps> = ({user}) => {



  if(!user){
    return <div className="w-full  flex justify-center items-center">
      <Spinning/>
    </div>
  }

  const courses = user.payedCourses.flatMap((payedCourse: any) =>payedCourse?.courses?.flatMap((c:any)=>c.course)
);


  const names=user?.name.split(" ")
  const date=new Date();
  date.setHours(0,0,0,0)
  console.log("today:",date)


  return ( <div className="flex w-full justify-center">
  <div className='sm:p-4 w-full justify-center gap-x-4 py-6 lg:py-0 grid grid-cols-1 lg:grid-cols-12'>
    <div className="flex p-2 justify-end w-full lg:col-span-4">
      {user? (
        <UserProfileContainer>
          <div className="flex text-center items-center w-full justify-start gap-x-4">
          <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.image || "/"} alt="User Image" />
                  <AvatarFallback>
                    {names[0]?.[0]}{names[1]?.[0]}
                  </AvatarFallback>
                </Avatar>
            <div className=" w-full items-center text-left ">
            <h2 className='text-[16px]  w-full  truncate flex gap-2  justify-between items-center text-center sm:text-lg  lg:text-lg xl:text-xl font-medium tracking-tight leading-tight '>
            <span> {user?.name}</span>
            <EditName user={user}/>
            </h2>
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
            <p className='lg:text-lg font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>
              My Streak
            </p>
            <div>
              

              {/* LONGEST STREAK */}
              <div className='text-[14px]'>
                <p className=" font-medium">Longest Streak: <span className="text-lg font-medium text-green-500">{user?.longestStreak?.streak}</span></p> 
                <div className="flex items-center text-gray-500 dark:text-gray-400  text-[10px]  font-light font-serif">
             <span>{formatDate(user?.longestStreak?.startAt)} </span> 
             <GoDash size={20}/>
          <span>{formatDate(user?.longestStreak?.endAt)} </span>
       </div>
                </div>


                {/* CURRENT STREAK */}
                <div className='text-[14px]'>
                <p className=" font-medium">Current Streak: <span className="text-lg font-medium text-green-500">{user?.currentStreak?.streak}</span></p> 
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
            <p className='lg:text-lg font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>
              Enrolled Courses: <span>{courses?.length}</span>
            </p>
            <div>
              {/* <p className='text-[14px]'>Completed: <span>20</span></p> */}
              <p className='text-[14px]'>Ongoing: <span>{courses?.length}</span></p>
            </div>
          </div>:""}


          {/* <div className="p-2">
            <div className='lg:text-lg gap-2 flex font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>
              Exams Taken: <span>1</span>
            </div>
          </div> */}
          {user?.teacher&&user?.teacher?.courses?<div className="p-2">
            <div className='lg:text-lg gap-2 flex font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>
              My Teaching Courses: <span>{user?.teacher?.courses?.length}</span>
            </div>
          </div>:""}
        </UserProfileContainer>
      ) : null}
    </div>

    <div className="flex p-2 justify-end w-full lg:col-span-8">
      {user ? (
        <UserProfileContainer className='space-y-6'>
          <EditYourDepartment user={user}/>
          {/* About me */}
          <EditYourDescription user={user}/>
          <CoursesStreak courses={user?.courseStreaks}/>
            {/* Enrolled Courses */}
           <EnrolledCourses user={user}/>



            {/* Exams Taken */}
            {/* <div className="p-2 sm:p-4  space-y-2">
            <h3 className='text-xl font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'> Exams Taken</h3>
            <p >Software Engineering Exit Exams</p>
            
          </div> */}


            {/* My Teaching Courses*/}
            <TeachingCourses user={user}/>
        </UserProfileContainer>
      ) : null}
    </div>
  </div>
</div>);
}
 
export default ProfileClient;

