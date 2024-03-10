import { getAllExamsCategory } from '@/actions/examsCategory/getAllExamsCategry'
import Heading from '@/components/Heading/Heading'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

const CreateExams =async () => {
  const exams=await getAllExamsCategory();
  return (<div></div>)
}

export default CreateExams