import React from 'react'
import { TeacherListClient } from './teachersClient'
import { getAllTeachers } from '@/actions/teacher/getAllTeachers'

const page = async() => {
  const teachers=await getAllTeachers();
  const mapTeachers=teachers?.map((teacher )=>{
    return{...teacher,name:teacher.user.name,email:teacher.user.email,image:teacher.user.image}
  }
    );
 
  return (<TeacherListClient teachers={mapTeachers || null}/>
  )
}

export default page