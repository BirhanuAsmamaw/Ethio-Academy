import { getTeacherById } from '@/actions/teacher/getTeacherById'
import React from 'react'
import TeacherClient from './teacherClient';
import { getTeacherPermission } from '@/actions/authorization/getTeacherPermission';

const TeacherPage = async({params}:{params:{teacherId:string}}) => {
  const teacher=await getTeacherById(params.teacherId);
  const permission=await getTeacherPermission("CanManageOwnCourse")
  
  return (<TeacherClient teacher={teacher} permission={permission}/>
  )
}

export default TeacherPage