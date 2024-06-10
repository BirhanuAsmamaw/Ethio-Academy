"use client"
import React from 'react'
import { TeacherListClient } from './teachersClient'
import { useInstructorlistsQuery } from '@/redux/features/instructors/instructorApi';


const page = () => {
  const { data: teachers, isSuccess, isError, isLoading } = useInstructorlistsQuery();

  if(isLoading){
    return <div className=" h-screen w-full flex justify-center items-center">
      <h1>Loading...</h1>
    </div>
  }


  if(isError){
    return <div className=" h-screen w-full flex justify-center items-center">
      <h1>Oops! Something went wrong!</h1>1
    </div>
  }


 
console.log("teachers:",teachers)

  const mapTeachers=teachers?.map((teacher )=>{
    
    return{...teacher,name:teacher.user.name,email:teacher.user.email,image:teacher.user.image}
  }
    );
 
  return (<>{isSuccess?<TeacherListClient teachers={mapTeachers || null}/>:""}</>
  )
}

export default page