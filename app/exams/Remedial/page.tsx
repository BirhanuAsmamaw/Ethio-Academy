
import Banner from '@/components/banner'
import ExamsCategoryCard from '@/components/card/examscategoryCard'
import Navbar from '@/components/navbar/Navbar'
import { remedialSubjects } from '@/lib/remedialSubjects'
import React from 'react'
import BuyExamButton from '../buyExamButton'
import { getDepartmentByName } from '@/actions/departments/getDepartmentByName'
import { getCurrentUser } from '@/actions/users/currentUser'
import Header from '@/components/Header'

const RemedialExamPage = async() => {
  const department=await getDepartmentByName("Freshman")
  const user=await getCurrentUser();
  const isCourseDepartment=user?.payedCourses.some((payedCourse) =>payedCourse.department?.departmentName===department?.departmentName&&payedCourse?.status);
  return (<>
  <Header
    title={`Ethiopian University Remedial Exams`}
    description={`Remedial  Exams  || All Remedial  Exams   With Answer and  Detail Exaplanations!`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Remedial Exams, Online Education, Lifelong Learning'
/>
  <Navbar/>
    <div className='min-h-screen w-full flex flex-col gap-10  pt-10'>
     <div className="p-4 md:p-6 lg:p-10 xl:p-20">
     <Banner title='Ethiopian University  Remedial Students  Exams'>
    {isCourseDepartment? <></>: <BuyExamButton department={department} trayUrl='/exams/Remedial/tray'/>}
      </Banner>
     </div>

      <div className="flex justify-center p-4">
        <div className="w-full gap-4 lg:w-10/12 xl:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {remedialSubjects.map((remedial:any,index:number)=>{
          return  <ExamsCategoryCard
          key={index}
           name={remedial.subject}
           url={`/exams/Remedial/${remedial.url}`}
           image={remedial.cover}
           />
         })}
         
        </div>
      </div>

    </div>
    </>
  )
}

export default RemedialExamPage