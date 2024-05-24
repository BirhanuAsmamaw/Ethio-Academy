"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import ChooseForm from "./chooseForm";
import Button from "@/components/button/button";
import { examsYears } from "@/lib/examsYear";
import Heading from "@/components/Heading/Heading";
import TextEditor from "@/components/editor/editor";
import AddButton from "@/components/button/addButton";

interface QuestionsClientProps {
  lesson: any;
}

const QuestionsClient: React.FC<QuestionsClientProps> = ({ lesson }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [ques,setQues]=useState("")
  const [code,setCode]=useState("")
  const [title_two,setTitle_two]=useState("")
  const [language,setLanguage]=useState("")
  const [isCode,setIsCode]=useState(false)
  const [isTitle2,setIsTitle2]=useState(false)
  const [question, setQuestion] = useState<any>({
    
    year: "",
    
    A: { text: "", isAnswer: false },
    B: { text: "", isAnswer: false },
    C: { text: "", isAnswer: false },
    D: { text: "", isAnswer: false },
  });

  const qData = {
    lessonId: lesson.id,
    year: question.year,
    title_two:title_two,
    code:code&&language?{
    code:code,
    language:language
    }:null,
    explanation,
    title: ques,
    chooses: [question.A, question.B, question.C, question.D],
  };

  const onSubmit = () => {
    setLoading(true);
    
    axios.post('/api/question', qData)
      .then(() => {
        toast.success("Question created successfully!");
        
        router.refresh();
      })
      .catch((error: any) => {
        toast.error("Failed to create question.");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
        setQuestion({
          
          year: "",
         
          A: { text: "", isAnswer: false },
          B: { text: "", isAnswer: false },
          C: { text: "", isAnswer: false },
          D: { text: "", isAnswer: false },
        });
      });
  };

  const handleChooseSelection = (choose: string, value: string) => {
    Object.keys(question).forEach(key => {
      if (key !== choose && question[key].isAnswer) {
        setQuestion((prevQuestion: any) => ({
          ...prevQuestion,
          [key]: {
            ...prevQuestion[key],
            isAnswer: false,
          },
        }));
      }
    });

    setQuestion((prevQuestion: any) => ({
      ...prevQuestion,
      [choose]: {
        ...prevQuestion[choose],
        isAnswer: value === "true",
      },
    }));
  };

  return (
    <div className="bg-white  rounded-md dark:bg-gray-800 pb-10 px-2 pt-10 mb-10 min-h-screen flex flex-col items-center gap-6 w-full lg:max-w-4xl ">
      <div className="p-4">
        <h5 className="text-[16px] md:text-lg lg:text-xl xl:text-2xl ">
          Create Engaging Questions for 
          <span className="  p-1 m-1 text-blue-600">{lesson?.title}</span> 
          in 
          <span >{lesson?.chapter?.title}</span> of 
           <span > {lesson?.chapter?.course.course}</span>
        </h5>
      </div>

      <div className="w-full ">
      <div className="p-4 flex flex-wrap w-full gap-x-4">
          <Select
            onValueChange={(value) => setQuestion({ ...question, year: value })}
          >
            <SelectTrigger className="w-[180px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
              <SelectValue placeholder="Select (Optional) Year" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-[10px]">
              <SelectGroup>
                <SelectLabel>Select (Optional) Year</SelectLabel>
                {examsYears.map((year, index) => (
                  <SelectItem className="w-full hover:bg-gray-200 hover:dark:bg-gray-600" key={index} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <AddButton isAdd={isCode} label="code" onAddButton={()=>{
            setCode("")
            setLanguage("")
            setIsCode((prev)=>!prev)
          }}/>

          <AddButton isAdd={isTitle2} label="Title Two" onAddButton={()=>{
            setTitle_two("")
            setIsTitle2((prev)=>!prev)
          }}/>
        </div>

        
        <div className="space-y-2 pl-4">
          <h6 className="text-lg">question</h6>
          <TextEditor value={ques} setValue={setQues}/>
        </div>

        {isCode?<div className="pl-4 space-y-6 mt-6 text-left w-full  justify-center flex flex-col">

  <input type="text" onChange={(event)=>setLanguage(event?.target.value)} className='border outline-none border-slate-400 hover:border-blue-500 focus:border-blue-500 p-2 focus:dark:border-green-400  hover:dark:border-green-400 dark:border-gray-500    w-full md:w-1/2 lg:w-1/3 xl:w-2/5 bg-slate-50 rounded-md dark:bg-gray-800' placeholder='add programming language'/>

  <textarea
  onChange={(event)=>setCode(event?.target.value)} 
  rows={6}
   className='w-full xl:w-1/2  outline-none bg-slate-50 rounded-md dark:bg-gray-800 border border-slate-400 dark:border-gray-500  hover:border-blue-500 focus:border-blue-500 focus:dark:border-green-400  hover:dark:border-green-400' placeholder='write code examples...'/>

</div>:""}

        {isTitle2?<div className="space-y-2 pl-4 mt-6">
          <h6 className="text-lg">question two</h6>
          <TextEditor value={title_two} setValue={setTitle_two}/>
        </div>:""}
     

        <div className={`p-2 py-4 xl:p-4 flex flex-col gap-2 ${question.Q !== "" ? 'block' : 'hidden'}`}>
          <ChooseForm 
            id="A" 
            onChange={(event) => setQuestion({ ...question, A: { ...question.A, text: event.target.value } })} 
            label="A" 
            onAnswer={(event) => handleChooseSelection('A', event.target.value)} 
          />
          <ChooseForm 
            id="B" 
            label="B" 
            onChange={(event) => setQuestion({ ...question, B: { ...question.B, text: event.target.value } })} 
            onAnswer={(event) => handleChooseSelection('B', event.target.value)} 
          />
          <ChooseForm 
            id="C" 
            label="C" 
            onChange={(event) => setQuestion({ ...question, C: { ...question.C, text: event.target.value } })} 
            onAnswer={(event) => handleChooseSelection('C', event.target.value)} 
          />
          <ChooseForm 
            id="D" 
            label="D" 
            onChange={(event) => setQuestion({ ...question, D: { ...question.D, text: event.target.value } })} 
            onAnswer={(event) => handleChooseSelection('D', event.target.value)} 
          />

          <div className="flex flex-col xl:px-4 w-full gap-1 my-4">
            <Heading small title="Provide Answer Explanation" />
            <TextEditor value={explanation} setValue={setExplanation} />
          </div>

          <div className="w-full flex justify-end gap-4 px-2 py-4">
            <Button
              isDisabled={isLoading}
              title={isLoading ? 'Loading...' : 'Submit'}
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsClient;
