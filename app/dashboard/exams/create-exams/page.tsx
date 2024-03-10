import { getAllExamsCategory } from '@/actions/examsCategory/getAllExamsCategry'
import Heading from '@/components/Heading/Heading'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import CreateExamsClient from './createExamsClientPage'

const CreateExams =async () => {
  const exams=await getAllExamsCategory();
  return (<CreateExamsClient exams={exams || []}/>)
}

export default CreateExams