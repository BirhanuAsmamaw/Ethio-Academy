"use client"

import Heading from '@/components/Heading/Heading'
import Button from '@/components/button/button';
import TextEditor from '@/components/editor/editor';
import ChooseForm from '@/components/questionForm/chooseForm';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {AnimatePresence,motion} from "framer-motion"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from "lucide-react"
import { examsYears } from '@/lib/examsYear';


 
interface  CreateExamsClientProps{
  university?:any[]|null;
 
  exams:any[]|null;
}
const CreateExamsClient:React.FC<CreateExamsClientProps>= ({exams,university}) => {
  const [isModel,setModel]=useState(false)
 
  
  // university
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [universityId, setuniversityId] = useState<string|null>(null);

  // exam type
  const [examOpen, setExamOpen] = useState(false);
  const [examValue, setExamValue] = useState("");
  



  // departemts
  const [depOpen, setDepOpen] = useState(false);
  const [depValue, setDepValue] = useState("");
  const [department, setdepartment] = useState<any>(null);
  const [departments, setDepartments] = useState<any[]|null>(null);


  // subjects
  const [subOpen, setSubOpen] = useState(false);
  const [subValue, setSubValue] = useState("");
  const [subjectId, setsubjectId] = useState<string|null>(null);
  const [subjects, setsubjects] = useState<any[]|null>(null);



// year
const [yeOpen, setyeOpen] = useState(false);
const [yeValue, setyeValue] = useState("");














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
  universityId:universityId,
  departmentId:department?.id,
  subjectId:subjectId? subjectId:null,
  year:yeValue,
  explanation:explanation,
  title:question.Q,
  title_two:question.Q2||null,
  isModel:isModel,
  chooses:[question.A,question.B,question.C,question.D]

}


const onSubmit=() => {

 
  setLoading(true);

  
console.log("data",qData);

  axios.post('/api/question',qData).then(()=>{
    toast.success("Question created successfully")
    router.refresh();
    router.push("/");
    
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




  return (<AnimatePresence>
    <motion.div 
    initial={{opacity : 0,y:15}}
    animate={{opacity :1,y:0}}
    exit={{opacity : 0,y:15}}
  className="py-10 flex  bg-white px-4 dark:bg-gray-800 flex-col gap-10 min-h-screen w-full">
     <div className="flex flex-col gap-10 lg:gap-20">
     <div className="w-full">
    <div className="p-4">
      <Heading title={`Write  Exam Question`}/>
    </div>


    
{/* add exams question */}
<div className="w-full pt-10 space-y-4">


  <div className="grid w-full grid-cols-1 md:grid-cols-4">

    {/* Exam Types */}
    <Popover open={examOpen} onOpenChange={setExamOpen}>
    <PopoverTrigger asChild>
      <button
        aria-expanded={examOpen}
        className="w-[200px] justify-between text-[14px] font-semibold leading-4"
      >
        {examValue
          ? exams?.find((exam) => exam.examType === examValue)?.examType
          : "exams"}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </button>
    </PopoverTrigger>
  
    <PopoverContent className="w-[200px] p-0">
      <Command>
        <CommandInput placeholder=" exam..." />
       <CommandList> <CommandEmpty>No exams found.</CommandEmpty>
        <CommandGroup>
          {exams?.map((exam) => (
            <CommandItem
              key={exam?.examType}
              value={exam?.examType}
              onSelect={(currentValue) => {
                setExamValue(currentValue === examValue ? "" : currentValue)
               setDepartments(exam?.departments)
                setExamOpen(false)
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  examValue === exam?.examType ? "opacity-100" : "opacity-0"
                )}
              />
              {exam?.examType}
            </CommandItem>
          ))}
        </CommandGroup></CommandList>
      </Command>
    </PopoverContent>
  </Popover>


    {/* Departments */}

    <Popover open={depOpen} onOpenChange={setDepOpen}>
    <PopoverTrigger asChild>
      <button
        aria-expanded={depOpen}
        className="w-[200px] justify-between text-[14px] font-semibold leading-4"
      >
        {depValue
          ? departments?.find((department) => department.departmentName === depValue)?.departmentName
          : "departments"}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </button>
    </PopoverTrigger>
  
    <PopoverContent className="w-[200px] p-0">
      <Command>
        <CommandInput placeholder=" department..." />
       <CommandList> <CommandEmpty>No departments found.</CommandEmpty>
        <CommandGroup>
          {departments?.map((department) => (
            <CommandItem
              key={department?.departmentName}
              value={department?.departmentName}
              onSelect={(currentValue) => {
                setDepValue(currentValue === depValue ? "" : currentValue)
               setdepartment(department)
               setsubjects(department?.subject)
                setDepOpen(false)
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  depValue === department?.departmentName ? "opacity-100" : "opacity-0"
                )}
              />
              {department?.departmentName}
            </CommandItem>
          ))}
        </CommandGroup></CommandList>
      </Command>
    </PopoverContent>
  </Popover>





    {/* Subjects */}

    <Popover open={subOpen} onOpenChange={setSubOpen}>
    <PopoverTrigger asChild>
      <button
        aria-expanded={subOpen}
        className="w-[200px] justify-between text-[14px] font-semibold leading-4"
      >
        {subValue
          ? subjects?.find((subject) => subject.subjectName === subValue)?.subjectName
          : "subjects"}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </button>
    </PopoverTrigger>
  
    <PopoverContent className="w-[200px] p-0">
      <Command>
        <CommandInput placeholder=" subject..." />
       <CommandList> <CommandEmpty>No subjects found.</CommandEmpty>
        <CommandGroup>
          {subjects?.map((subject) => (
            <CommandItem
              key={subject?.subjectName}
              value={subject?.subjectName}
              onSelect={(currentValue) => {
                setSubValue(currentValue === subValue? "" : currentValue)
               setsubjectId(subject?.id)
                setSubOpen(false)
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === subject?.subjectName ? "opacity-100" : "opacity-0"
                )}
              />
              {subject?.subjectName}
            </CommandItem>
          ))}
        </CommandGroup></CommandList>
      </Command>
    </PopoverContent>
  </Popover>




    {/* Year */}

    <Popover open={yeOpen} onOpenChange={setyeOpen}>
    <PopoverTrigger asChild>
      <button
        aria-expanded={yeOpen}
        className="w-[200px] justify-between text-[14px] font-semibold leading-4"
      >
        {yeValue
          ? yeValue
          : "Years"}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </button>
    </PopoverTrigger>
  
    <PopoverContent className="w-[200px] p-0">
      <Command>
        <CommandInput placeholder=" Years..." />
       <CommandList> <CommandEmpty>No Years found.</CommandEmpty>
        <CommandGroup>
          {examsYears?.map((year) => (
            <CommandItem
              key={year}
              value={year}
              onSelect={(currentValue) => {
                setyeValue(currentValue === yeValue? "" : currentValue)
             
                setyeOpen(false)
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  yeValue === year? "opacity-100" : "opacity-0"
                )}
              />
              {year}
            </CommandItem>
          ))}
        </CommandGroup></CommandList>
      </Command>
    </PopoverContent>
  </Popover>




  </div>

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




  {(((isModel&&department.url!=="Highschool")&&university)||department?.exam.url==="COC")?<div className="p-6 flex  w-[350px]" >
<Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild   >
        <button
          
          aria-expanded={open}
          
          className=" w-full flex justify-between border p-2 rounded-[5px] dark:border-gray-700"
        >
          <p>{value
            ? value
            : "Select the  university..."}</p>
 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
        
      </PopoverTrigger>
     
    
      <PopoverContent className=" p-0">
        <Command className="bg-white dark:bg-gray-800 shadow-md dark:shadow-black border dark:border-gray-600">
          <CommandInput  placeholder="Search the university..." />
          <CommandList>
            <CommandEmpty>No university found.</CommandEmpty>
            <CommandGroup>
              {university?.map((un) => (
                <CommandItem
                  key={un.id}
                  value={un.name.toLowerCase()}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setuniversityId((isModel||department.exam.url==="COC")? un.id:null);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === un.name.toLowerCase()? "opacity-100" : "opacity-0"
                    )}
                  />
                  {un.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover> 
</div>:""}


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
  </motion.div>
  </AnimatePresence>
 
  )
}

export default CreateExamsClient