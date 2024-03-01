"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";

import ChooseForm from "./chooseForm";
import axios from "axios";
import toast from "react-hot-toast";

import Button from "@/components/button/button";
import { examsYears } from "@/lib/examsYear";
import Heading from "@/components/Heading/Heading";
import TextEditor from "@/components/editor/editor";
import { useRouter } from "next/navigation";

interface QuestionsClientProps{
  lesson:any;
}


const QuestionsClient:React.FC<QuestionsClientProps> = ({lesson}) => {
const router=useRouter();
   const [isLoading,setLoading]=useState(false);
   const [explanation,setExplanation]=useState("")
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




const qData={
  lessonId:lesson.id,
  year:question.year,
  explanation:explanation,
  title:question.Q,
  chooses:[question.A,question.B,question.C,question.D]

}

const onSubmit=() => {


  setLoading(true);

  


  axios.post('/api/question',qData).then(()=>{
    toast.success("Question created successfully")
    router.refresh();
  }).catch((error:any)=>{
    console.log("Error",error);
    
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

console.log("data",qData);
  return (  <div className={`bg-white dark:bg-gray-800 pb-10 px-3 mb-10 min-h-screen flex flex-col items-center gap-6 w-full`}>
  
     <div className="p-4">
      <h5 className="text-lg">Write Questions of <span className="text-green-600 dark:text-green-400">{lesson.title}</span> in <span className="text-rose-600 dark:text-rose-400">{lesson.chapter.title} </span>of <span className="text-blue-600 dark:text-blue-400">{lesson.chapter.course.subject}</span></h5>
     </div>




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
    onChange={(event) => setQuestion({ ...question, A:{ ...question.A,text: event.target.value } })} 
    label="A"
    onAnswer={(event) => setQuestion({ ...question, A: {...question.A, isAnswer: Boolean(event.target.value ) } })} />

   <ChooseForm 
    label="B"
   onChange={(event)=>setQuestion({...question,B:{...question.B,text:event.target.value}})}
   onAnswer={(event) => setQuestion({ ...question, B: { ...question.B,isAnswer: Boolean(event.target.value )} })} 
   />
   

   <ChooseForm 
    label="C"
   onChange={(event)=>setQuestion({...question,C:{...question.C,text:event.target.value}})}
   onAnswer={(event) => setQuestion({ ...question, C: {...question.C, isAnswer:  Boolean(event.target.value )} })} 
   />

   <ChooseForm 
   label="D"
   onChange={(event)=>setQuestion({...question,D:{...question.D,text:event.target.value}})}
   onAnswer={(event) => setQuestion({ ...question, D: {...question.D, isAnswer:  Boolean(event.target.value )} })} 
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
  </div>);
}
 
export default QuestionsClient;