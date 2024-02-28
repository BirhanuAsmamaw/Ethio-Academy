"use client"

import { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import ChooseForm from "./chooseForm";
import axios from "axios";
import toast from "react-hot-toast";
import { lessons } from "@/lib/lessons";
import Button from "@/components/button/button";

interface QuestionsClientProps{
  lesson:any;
}


const QuestionsClient:React.FC<QuestionsClientProps> = ({lesson}) => {

   const [isLoading,setLoading]=useState(false);
    const [question,setQuestion]=useState<any>(
        {Q:"",
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
  year:"2015",
  title:question.Q,
  chooses:[question.A,question.B,question.C,question.D]

}
const onAddQuestion=() => {
  setLoading(true);
  axios.post('/api/question',qData).then(()=>{
    toast.success("Question created successfully")
  }).catch((error:any)=>{
    toast.error(error.message)
  }).finally(()=>{
    setLoading(false);
  })
    
 console.log("Question",qData);
 
};
  return (  <div className={`bg-white dark:bg-gray-800 pb-10  mb-10 min-h-screen flex flex-col items-center gap-6 w-full`}>
  
     <div className="p-4">
      <h5 className="text-lg">Write Questions of <span className="text-green-600 dark:text-green-400">{lesson.title}</span> in <span className="text-rose-600 dark:text-rose-400">{lesson.chapter.title} </span>of <span className="text-blue-600 dark:text-blue-400">{lesson.chapter.course.subject}</span></h5>
     </div>




     <div className="w-full pt-10">
<textarea
onChange={(event)=>setQuestion({...question,Q:event.target.value})}
className="block 
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
"
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
   
   <div className="w-full flex justify-end px-2 py-4">
    <Button
    isDisabled={isLoading}
    title={isLoading ? 'Loading...':'Submit'}
    onClick={onAddQuestion}
  />
   </div>
</div>
  </div>
  </div>);
}
 
export default QuestionsClient;