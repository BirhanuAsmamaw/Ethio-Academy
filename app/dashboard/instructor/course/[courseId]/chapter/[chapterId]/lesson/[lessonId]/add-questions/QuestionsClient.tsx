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

interface QuestionsClientProps {
  lesson: any;
}

const QuestionsClient: React.FC<QuestionsClientProps> = ({ lesson }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [question, setQuestion] = useState<any>({
    Q: "",
    year: "",
    explanation: "",
    A: { text: "", isAnswer: false },
    B: { text: "", isAnswer: false },
    C: { text: "", isAnswer: false },
    D: { text: "", isAnswer: false },
  });

  const qData = {
    lessonId: lesson.id,
    year: question.year,
    explanation,
    title: question.Q,
    chooses: [question.A, question.B, question.C, question.D],
  };

  const onSubmit = () => {
    setLoading(true);
    console.log("questions Data:-",qData)
    axios.post('/api/question', qData)
      .then(() => {
        toast.success("Question created successfully!");
        router.push(`/dashboard/departments/${lesson?.chapter.course.subject.department.id}/${lesson?.chapter.course.subject.id}/course/${lesson?.chapter.course.id}/chapter`);
        router.refresh();
      })
      .catch((error: any) => {
        toast.error("Failed to create question.");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
        setQuestion({
          Q: "",
          year: "",
          explanation: "",
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
        <h5 className="text-[12px] sm:text-[14px] md:text-lg lg:text-xl xl:text-2xl ">
          Create Engaging Questions for 
          <span className=" bg-blue-600 p-1 m-1 text-white">{lesson?.title}</span> 
          in 
          <span >{lesson?.chapter?.title}</span> of 
           <span > {lesson?.chapter?.course.course}</span>
        </h5>
      </div>

      <div className="w-full ">
      <div className="p-4">
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
        </div>

        <textarea
          onChange={(event) => setQuestion({ ...question, Q: event.target.value })}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-[10px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your Quiz or Exam Question here..."
          rows={4}
        ></textarea>

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
