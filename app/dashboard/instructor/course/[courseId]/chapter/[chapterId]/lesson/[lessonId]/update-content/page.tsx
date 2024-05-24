import { getLessonById } from '@/actions/lessons/getLessonById';
import React from 'react'
import UpdateLessonContentClient from './updateContentClient';

interface IParams{
  lessonId: string;
}
const UpdateLessonContentPage = async({params}:{params:IParams}) => {
  const lesson=await getLessonById(params.lessonId)
 

  return (<UpdateLessonContentClient lesson={lesson}/>
  )
}

export default UpdateLessonContentPage