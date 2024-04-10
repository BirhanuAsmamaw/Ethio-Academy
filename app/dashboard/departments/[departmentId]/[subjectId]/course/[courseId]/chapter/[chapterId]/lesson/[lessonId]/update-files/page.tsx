import React from 'react'
import UpdateLessonFileClient from './updateLessonFileClient'
import { getLessonById } from '@/actions/lessons/getLessonById'

const UpdateLessonFiles = async({params}:{params:{lessonId:string}}) => {
  const lesson=await getLessonById(params.lessonId)
  return (<UpdateLessonFileClient lesson={lesson}/>
  )
}

export default UpdateLessonFiles