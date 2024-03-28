"use client"

import Heading from '@/components/Heading/Heading'
import Button from '@/components/button/button';
import TextEditor from '@/components/editor/editor';
import ChooseForm from '@/components/questionForm/chooseForm';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { examsYears } from '@/lib/examsYear';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

 
interface  CreateExamsClientProps{
 
  exams:any[];
}
const CreateExamsClient:React.FC<CreateExamsClientProps> = ({exams}) => {
  const [examIdvalue,setExamIdValue]=useState("")
  const [departmentIdvalue,setDepartmentIdValue]=useState("")
  const [departments,setDepartments]=useState<any|null>(null)
  const [subjects,setSubjects]=useState<any|null>(null)
  const [subjectValue,setSubjectValue]=useState<string>("")


  useEffect(()=>{
    if(exams){
    const Ex=exams.filter((exam)=>exam.id==examIdvalue)
    setDepartments(Ex[0])}
  },[exams,examIdvalue])



  useEffect(()=>{
    if (departments){
    const dep=departments.departments.filter((department:any)=>department.id==departmentIdvalue)
    setSubjects(dep[0])}
  },[departments,departmentIdvalue])
















  const router=useRouter();
   const [isLoading,setLoading]=useState(false);
   const [explanation,setExplanation]=useState("")
   const [selectedChoose, setSelectedChoose] = useState<string>("");
    const [question,setQuestion]=useState<any>(
        {Q:"",
        year:"",
        explanation:"",
A:{
    text:"",
    isAnswer:false,
},
B:{
    text:"",
    isAnswer:false,
},

C:{
    text:"",
    isAnswer:false,
},
D:{
    text:"",
    isAnswer:false,
},
});

useEffect(() => {
  // Set previous selectedChoose to false when a new one is selected
  if (selectedChoose !== "") {
    setQuestion((prevQuestion:any) => ({
      ...prevQuestion,
      [selectedChoose]: {
        ...prevQuestion[selectedChoose],
        isAnswer: false,
      },
    }));
  }
}, [selectedChoose]);


const qData={
  departmentId:departmentIdvalue,
  subject:subjectValue,
  year:question.year,
  explanation:explanation,
  title:question.Q,
  chooses:[question.A,question.B,question.C,question.D]

}

const onSubmit=() => {


  setLoading(true);

  
console.log('questionData',qData)

  axios.post('/api/question',qData).then(()=>{
    toast.success("Question created successfully")
    router.refresh();
  }).catch((error:any)=>{
   
    
  }).finally(()=>{
    setLoading(false);
    setQuestion({Q:"",
    year:"",
    explanation:"",
A:{
text:"",
isAnswer:false,
},
B:{
text:"",
isAnswer:false,
},

C:{
text:"",
isAnswer:false,
},
D:{
text:"",
isAnswer:false,
},
})
  })
    

 
};


  return (<div className="py-10 flex  bg-white px-4 dark:bg-gray-800 flex-col gap-10 min-h-screen w-full">
     <div className="w-full">
    <div className="p-4">
      <Heading title={'Exams Subject'}/>
    </div>

  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
    {/* create exams category */}
    <div className="w-full   flex flex-col gap-1">
    <Select
           onValueChange={
            (value)=>setExamIdValue(value)
          }>
      <SelectTrigger  className="w-[180px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
        <SelectValue  placeholder="Select Exam Typet" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
        <SelectGroup>
          <SelectLabel>Select Exam Type</SelectLabel>
         {exams?.map((exam,index) =>{
         return  <SelectItem className="w-full hover:bg-gray-200  hover:dark:bg-gray-600" key={index} value={exam.id}>{exam.examType}</SelectItem >
         })}
          
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>


  
   
<div className="w-full   flex flex-col gap-1">
    <Select
           onValueChange={
            (value)=>setDepartmentIdValue(value)
          }>
      <SelectTrigger  className="w-[180px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
        <SelectValue  placeholder="Select Department" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
        <SelectGroup>
          <SelectLabel>Select Department</SelectLabel>
         {departments?.departments?.map((department:any,index:number) =>{
         return  <SelectItem className="w-full hover:bg-gray-200  hover:dark:bg-gray-600" key={index} value={department.id}>{department.departmentName}</SelectItem >
         })}
          
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>

<div className="w-full   flex flex-col gap-1">
    <Select
           onValueChange={
            (value)=>setSubjectValue(value)
          }>
      <SelectTrigger  className="w-[180px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
        <SelectValue  placeholder="Select Subject" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
        <SelectGroup>
          <SelectLabel>Select Subject</SelectLabel>
         {subjects?.subject?.map((subject:any,index:number) =>{
         return  <SelectItem className="w-full hover:bg-gray-200  hover:dark:bg-gray-600" key={index} value={subject.subjectName}>{subject.subjectName}</SelectItem >
         })}
          
        </SelectGroup>
      </SelectContent>
    </Select>

    </div>
    </div>
{/* add exams question */}
<div className="w-full pt-10">

<div className="p-4">
  <Select
   onValueChange={
    (value)=>setQuestion({...question,year:value})
  }>
<SelectTrigger  className="w-[180px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
<SelectValue  placeholder="Select a Quizzes Year" />
</SelectTrigger>
<SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
<SelectGroup>
  <SelectLabel>Select a Quizzes Year</SelectLabel>
 {examsYears.map((year,index) =>{
 return  <SelectItem className="w-full hover:bg-gray-200  hover:dark:bg-gray-600" key={index} value={year}>{year}</SelectItem >
 })}
  
</SelectGroup>
</SelectContent>
</Select>
  </div>




<textarea
onChange={(event)=>setQuestion({...question,Q:event.target.value})}
className={`
block 
p-2.5 w-full 
text-sm 
text-gray-900 
bg-gray-50 

rounded-[10px]
border 
border-gray-300
focus:ring-blue-500 
focus:border-blue-500 
dark:bg-gray-700 
dark:border-gray-600 
dark:placeholder-gray-400 
dark:text-white 
dark:focus:ring-blue-500 
dark:focus:border-blue-500

${question.year!==""? 'block':'hidden'}
`}
rows={4}
></textarea>



<div className={`p-4 flex flex-col gap-2 ${question.Q!==""? 'block':'hidden'}`}>

<ChooseForm 
id='A'
onChange={(event) => setQuestion({ ...question, A:{ ...question.A,text: event.target.value } })} 
label="A"
onAnswer={(event) =>{
  setSelectedChoose("A");
    setQuestion((prevQuestion:any) => ({
      ...prevQuestion,
      A: {
        ...prevQuestion["A"],
        isAnswer: Boolean(event.target.value),
      },
    }));
}} />

<ChooseForm 
label="B"
id='B'
onChange={(event)=>setQuestion({...question,B:{...question.B,text:event.target.value}})}
onAnswer={(event) =>{
  setSelectedChoose("B");
    setQuestion((prevQuestion:any) => ({
      ...prevQuestion,
      B: {
        ...prevQuestion["B"],
        isAnswer: Boolean(event.target.value),
      },
    }));
}} 
/>


<ChooseForm 
id='C'
label="C"
onChange={(event)=>setQuestion({...question,C:{...question.C,text:event.target.value}})}
onAnswer={(event) =>{
  setSelectedChoose("C");
    setQuestion((prevQuestion:any) => ({
      ...prevQuestion,
      C: {
        ...prevQuestion["C"],
        isAnswer: Boolean(event.target.value),
      },
    }));
}} 
/>

<ChooseForm 
id='D'
label="D"
onChange={(event)=>setQuestion({...question,D:{...question.D,text:event.target.value}})}
onAnswer={(event) =>{
  setSelectedChoose("D");
    setQuestion((prevQuestion:any) => ({
      ...prevQuestion,
      D: {
        ...prevQuestion["D"],
        isAnswer: Boolean(event.target.value),
      },
    }));
}} 
/>
<div className="flex flex-col px-4 w-full gap-1 my-4">
    <Heading small title="Write Answer Explanation"/>
  <TextEditor value={explanation} setValue={setExplanation}/>
  </div>
<div className="w-full flex justify-end  gap-4 px-2 py-4">


<Button
isDisabled={isLoading}
title={isLoading ? 'Loading...':'Submit'}
onClick={onSubmit}
/>
</div>
</div>
</div>
</div>

  </div>
 
  )
}

export default CreateExamsClient