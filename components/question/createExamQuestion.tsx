"use client"

import Heading from '@/components/Heading/Heading'
import Button from '@/components/button/button';
import TextEditor from '@/components/editor/editor';
import ChooseForm from '@/components/questionForm/chooseForm';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';


 
interface  CreateExamsClientProps{
 
  department: any;
  subject?: any|null;
  year: string;
  
}
const CreateExamsClient:React.FC<CreateExamsClientProps> = ({department,subject,year}) => {
  const [isModel,setModel]=useState(false)
 
  

















  const router=useRouter();
   const [isLoading,setLoading]=useState(false);
   const [explanation,setExplanation]=useState("")
    const [question,setQuestion]=useState<any>(
        {Q:"",
        Q2:"",
        
        
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
  departmentId:department.id,
  subject:subject,
  year:year,
  explanation:explanation,
  title:question.Q,
  title_two:question.Q2||null,
  isModel:isModel,
  chooses:[question.A,question.B,question.C,question.D]

}

const onSubmit=() => {


  setLoading(true);

  
console.log('questionData',qData)

  axios.post('/api/question',qData).then(()=>{
    toast.success("Question created successfully")
    router.back();
    router.refresh();
  }).catch((error:any)=>{
   
    
  }).finally(()=>{
    setLoading(false);
    setQuestion({
      Q:"",
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



const handleChooseSelection = (choose: string, value: string) => {
   // Unmark previously selected option
   Object.keys(question).forEach(key => {
    if (key !== choose && question[key].isAnswer) {
      setQuestion((prevQuestion:any )=> ({
        ...prevQuestion,
        [key]: {
          ...prevQuestion[key],
          isAnswer: false
        }
      }));
    }
  });

  
  setQuestion((prevQuestion:any) => ({
    ...prevQuestion,
    [choose]: {
      ...prevQuestion[choose],
      isAnswer: value === "true"
    }
  }));
};




  return (<div className="py-10 flex  bg-white px-4 dark:bg-gray-800 flex-col gap-10 min-h-screen w-full">
     <div className="flex flex-col gap-10 lg:gap-20">
     <div className="w-full">
    <div className="p-4">
      <Heading title={`Write ${subject.subjectName? subject:department.departmentName} in  ${year} Year Exam Question`}/>
    </div>


    
{/* add exams question */}
<div className="w-full pt-10 space-y-4">

<div className="flex justify-center pb-10 w-full gap-10">
 
<div className="flex gap-4">

<div className="flex items-center ">
    <input  checked={isModel}  onChange={(event) => setModel(true)}  id="model-1" type="radio" value="" name="model" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-700 dark:ring-offset-gray-800  rounded-full focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label htmlFor="model-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Is Model?</label>
</div>
<div className="flex items-center">
    <input checked={!isModel}   onChange={(event) => setModel(false)} id="model-2" type="radio" value="" name="model" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-700 dark:ring-offset-gray-800 rounded-full  focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Is Not Model?</label>
</div>

  
</div>
  </div>



<div className="space-y-2">
  <label className='text-lg' htmlFor="Q">
    question
  </label>

<textarea
id='Q'
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

`}
rows={4}
></textarea>
</div>




<div className="space-y-2">
  <label className='text-lg' htmlFor="Q2">
    question bottom Image(optional)
  </label>

<textarea
id='Q2'
onChange={(event)=>setQuestion({...question,Q2:event.target.value})}
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

`}
rows={4}
></textarea>
</div>

<div className={`p-4 flex flex-col gap-2 `}>

<ChooseForm 
id='A'
onChange={(event) => setQuestion({ ...question, A:{ ...question.A,text: event.target.value } })} 
label="A"
onAnswer={(event) =>handleChooseSelection('A', event.target.value)} />

<ChooseForm 
label="B"
id='B'
onChange={(event)=>setQuestion({...question,B:{...question.B,text:event.target.value}})}
onAnswer={(event) =>handleChooseSelection('B', event.target.value)} 
/>


<ChooseForm 
id='C'
label="C"
onChange={(event)=>setQuestion({...question,C:{...question.C,text:event.target.value}})}
onAnswer={(event) =>handleChooseSelection('C', event.target.value)} 
/>

<ChooseForm 
id='D'
label="D"
onChange={(event)=>setQuestion({...question,D:{...question.D,text:event.target.value}})}
onAnswer={(event) =>handleChooseSelection('D', event.target.value)} 
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
  </div>
 
  )
}

export default CreateExamsClient