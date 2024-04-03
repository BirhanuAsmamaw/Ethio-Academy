"use client"
import Heading from '@/components/Heading/Heading'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import Input from '@/components/input/input'
import Button from '@/components/button/button'
import TextEditor from '../editor/editor'

interface UpdateQuestionContentProps{
  question: any;
}
const UpdateQuestionContent:React.FC<UpdateQuestionContentProps> = ({question}) => {
  const router=useRouter()
  const [isLoading, setIsLoading]=useState(false)
  
const [explanation,setExplanation]=useState<any>()
  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues: {
      title:question.title,
      title_two:question.title_two,
      year:question.year
    },
  })
  







  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setIsLoading(true)
   
    
    axios.put(`/api/question/${question.id}/update/content`,data).then(()=>{
      toast.success("Question updated successfully")
      router.refresh()
    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setIsLoading(false)
    });

  }
  return ( <div className="w-full p-2 bg-white shadow-md dark:bg-slate-800">
  <div className="p-4">
  <Heading small title="Update Question Content"/>
  </div>
<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 justify-between">
 
  <div className="pt-10 flex flex-col gap-4 justify-between px-4">
  <div className=" flex-col items-center justify-center w-full ">

<Input 
id="title" 
defaultValue={question.title}
register={register} errors={errors}  label="question" type="text" required/>
</div>

<div className=" flex-col items-center justify-center w-full ">

<Input id="title_two" 
defaultValue={question.title_two}
register={register} errors={errors}  label="question 2" type="text" />


<Input id="year" 
defaultValue={question.year}
register={register} errors={errors}  label="year" type="text" required/>



<div className="flex flex-col px-4 w-full gap-1 my-4">
            <Heading small title="Update Course Description"/>
       
          <TextEditor  value={explanation? explanation:question.explanation} setValue={setExplanation}/>
          </div>
</div>
  </div>
</div>
<div className="w-full flex justify-end  mt-6 py-6 px-4 ">
  <Button isDisabled={isLoading} title={isLoading?'Loading...':'Submit'} onClick={handleSubmit(onSubmit)}/>
</div>
</div>
  )
}

export default UpdateQuestionContent