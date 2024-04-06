
import Banner from '@/components/banner'
import ExamsCategoryCard from '@/components/card/examscategoryCard'
import Navbar from '@/components/navbar/Navbar'

import React from 'react'
import BuyExamButton from '../buyExamButton'
import { getCurrentUser } from '@/actions/users/currentUser'
import { getDepartmentByName } from '@/actions/departments/getDepartmentByName'
import Header from '@/components/Header'

const COCPage = async() => {
  const user=await getCurrentUser();
  const isCoursePDepartment=user?.payedCourses.some((payedCourse) =>payedCourse.department?.departmentName==="Freshman"&&payedCourse?.status);

const department=await getDepartmentByName("Freshman")
  return (
    <>
    <Header
    title='Ethiopian University Entrance Exams'
    description='Ethiopian University Entrance Exams || All Exams With Answer and  Detail Exaplanations!'
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>
    <Navbar/>
    <div className='min-h-screen w-full flex flex-col gap-10  pt-10 pb-20'>
     <div className="p-4 md:p-6 lg:p-10 xl:p-20">
     <Banner title="Ethiopian University Entrance Exams">
     {isCoursePDepartment? <></>:<BuyExamButton department={department} />}
     </Banner>
     </div>

      <div className="flex justify-center p-4">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {department?.subject.map((coc:any,index:number)=>{
          return  <ExamsCategoryCard
          key={index}
           name={coc.subjectName}
           url={`/exams/COC/${coc.id}`}
           image={coc?.cover? coc?.cover.public_url:""}
           />
         })}

        
         
        </div>
      </div>

    </div>
    </>
  )
}

export default COCPage