import { getTeacherById } from '@/actions/teacher/getTeacherById'
import React from 'react'
import TeacherClient from './teacherClient';

const TeacherPage = async({params}:{params:{teacherId:string}}) => {
  const teacher=await getTeacherById(params.teacherId);
  
  
  return (<TeacherClient teacher={teacher} />
  )
}

export default TeacherPage