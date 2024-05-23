"use client"
import React from 'react'
import UserProfileContainer from './userProfileContainer'
import { useUserProfileQuery } from '@/redux/features/user/userApi'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { socialData } from '@/lib/socialData'
import SocialLink from './socialLink'
import Header from '@/components/Header'

const UserProfileClient = ({ userId }:{userId:string}) => {
  const { data, isLoading, isSuccess, isError, error } = useUserProfileQuery(userId)
  const names = data?.name.split(" ") || []
  
  return (<> <Header
    keywords={`EthioAcademy, ${data?.name} profile, ${data?.teacher&&data?.teacher?.accountName|| ""}, top student, academic achievements, student success, inspiring journey, education excellence`}
    description={data.description? data?.description:`Discover the inspiring journey of ${data?.name}, a standout student in the ${data?.department || ""} department at EthioAcademy. Dive into their academic achievements, unique skills, and contributions to our vibrant learning community. Be inspired by their dedication and success!`}

    title={`${data?.name} | Top Student  ${data?.department?`in ${data?.department}`:""} at EthioAcademy`}
  />
    <div className="flex w-full justify-center">
      <div className='min-h-screen sm:p-4 w-full lg:w-11/12 justify-center gap-x-4 pt-20 lg:pt-40 pb-10 grid grid-cols-1 lg:grid-cols-12'>
        <div className="flex p-2 justify-end w-full lg:col-span-4">
          {isSuccess && data ? (
            <UserProfileContainer>
              <div className="flex text-center items-center w-full justify-start gap-x-2">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={data?.image || "/"} alt="User Image" />
                  <AvatarFallback>
                    {names[0]?.[0]}{names[1]?.[0]}
                  </AvatarFallback>
                </Avatar>
                <h2 className='text-[20px] sm:text-lg truncate lg:text-xl xl:text-2xl font-medium tracking-tight leading-tight p-2'>
                 {data.name}
                </h2>
              </div>
              <div className="p-2">
                <p className='lg:text-lg font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>Contact Me</p>
                <div>
                  {socialData.map((social, index) => (
                    <SocialLink key={index} url={social.url} icon={social.icon} name={social.name} />
                  ))}
                </div>
              </div>
              <div className="p-2">
                <p className='lg:text-lg font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>
                  Enrolled Courses: <span>40</span>
                </p>
                <div>
                  <p className='text-[14px]'>Completed: <span>20</span></p>
                  <p className='text-[14px]'>Ongoing: <span>20</span></p>
                </div>
              </div>
              <div className="p-2">
                <div className='lg:text-lg gap-2 flex font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>
                  Exams Taken: <span>1</span>
                </div>
              </div>
              <div className="p-2">
                <div className='lg:text-lg gap-2 flex font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>
                  My Teaching Courses: <span>23</span>
                </div>
              </div>
            </UserProfileContainer>
          ) : isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Oops! Something went wrong.</div>
          ) : null}
        </div>

        <div className="flex p-2 justify-end w-full lg:col-span-8">
          {isSuccess && data ? (
            <UserProfileContainer className='space-y-6'>
              {data?.department?<h1 className='text-lg md:text-xl truncate lg:text-2xl xl:text-3xl font-medium tracking-tight leading-tight p-2'>
                {data?.department}
              </h1>:""}
              {/* About me */}
              {data?.description?<div className="p-2 sm:p-4 space-y-2">
                <h3 className='text-xl font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>About me</h3>
               <div className="text-wrap" dangerouslySetInnerHTML={{__html:data?.description}}></div>
              </div>:""}

                {/* Enrolled Courses */}
                <div className="p-2 sm:p-4  space-y-2">
                <h3 className='text-xl font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>Enrolled Courses</h3>
               

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Course Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Subject
                </th>
                <th scope="col" className="px-6 py-3">
                    Department
                </th>
                <th scope="col" className="px-6 py-3">
                    The Course given By
                </th>
                <th scope="col" className="px-6 py-3">
                    status
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Biology Grade 12
                </th>
                <td className="px-6 py-4">
                    Biology
                </td>
                <td className="px-6 py-4">
                    HighSchool
                </td>
                <td className="px-6 py-4">
                   Alpha Academy
                </td>
                <td className="px-6 py-4">
                    ongoing
                </td>
            </tr>
           
        </tbody>
    </table>
</div>

              </div>



                {/* Exams Taken */}
                <div className="p-2 sm:p-4  space-y-2">
                <h3 className='text-xl font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'> Exams Taken</h3>
                <p >Software Engineering Exit Exams</p>
                
              </div>


                {/* My Teaching Courses*/}
                <div className="p-2 sm:p-4  space-y-2">
                <h3 className='text-xl font-medium leading-10 border-b-2 border-slate-200 dark:border-gray-600'>My Teaching Courses</h3>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Course Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Subject
                </th>
                <th scope="col" className="px-6 py-3">
                    Department
                </th>
              
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Biology Grade 12
                </th>
                <td className="px-6 py-4">
                    Biology
                </td>
                <td className="px-6 py-4">
                    HighSchool
                </td>
                
            </tr>
           
        </tbody>
    </table>
</div>
                
              </div>
            </UserProfileContainer>
          ) : isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Oops! Something went wrong.</div>
          ) : null}
        </div>
      </div>
    </div></>
  )
}

export default UserProfileClient;
