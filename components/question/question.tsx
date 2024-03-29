"use client";
import MainLayout from "@/components/layouts/mainLayout";
import SubLayout from "@/components/layouts/subLayout";
import { IoIosArrowRoundBack } from "react-icons/io";
import NoExamNotification from "@/components/notification/noExamNotification";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";

interface QuestionComponentProps{
    notificationTitle:string,
    notificationUrl:string,
    notificationLabel:string,
    examsTitle:string,
    Questions:any[];

}
const QuestionComponent:React.FC<QuestionComponentProps> = ({Questions,notificationTitle,notificationUrl,examsTitle,notificationLabel}) => {
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [isSelectedAll, setSelectedAll] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<any>({});
 const router=useRouter();
  const isVisible=useSearchParams();
  const isVisibleFeedBackQuery=isVisible?.get("right")


  useEffect(() => {
    setFeedbackVisible(isVisibleFeedBackQuery? true: false)
  }, [isVisibleFeedBackQuery]);


  const onSelectionChanged = (
    questionId: number,
    choiceIndex: string,
    isAnswer: boolean
  ) => {
    const updatedChoices = {
      ...selectedChoices,
      [questionId]: {
        choiceIndex,
        isCorrect: isAnswer,
      },
    };
    setSelectedChoices(updatedChoices);

    // Calculate score
    const newScore = Object.values(updatedChoices).reduce(
      (acc: number, choice: any) => (choice.isCorrect ? acc + 1 : acc),
      0
    );
    setScore(newScore);
  };

  const onSubmit = () => {
    setFeedbackVisible(true);
    setSelectedAll(true);
  };

 


  
  if (!Questions || !Questions.length){
    return (<div className="h-screen  p-4 w-full flex justify-center items-center">
      <NoExamNotification notification={notificationTitle} url={notificationUrl} label={notificationLabel}/>
    </div>)
  }
  return (<MainLayout>
      <SubLayout className="bg-white dark:bg-gray-800 dark:border-gray-700 border-gray-300 border-x-2 border-double">
        <div className="pt-6" id="quiz">
        <button onClick={()=>router.back()} type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
         <IoIosArrowRoundBack size={24}/>
         <p> Back to Exams List</p>
          </button>
          <div className="p-2 space-y-2 py-6">
            <div className="flex justify-between md:px-10">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
<span className="relative  px-2 md:px-5 py-1 md:py-2.5  transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Previuos Year Exam
</span>
</button>
<button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
<span className="relative px-2 md:px-5 py-1 md:py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Next Year Exam
</span>
</button>
            </div>
            <h4 className="text-lg mt-6 font-semibold border-b-2 border-dashed">
           {examsTitle}
            </h4>
          </div>
          {Questions.map((question: any, index:number) => {
            return (
              <div key={index} className="">
                <div className="flex border-b border-double border-green-600 justify-between">
                  <p className="text-xl font-bold">{index + 1}</p>
                  
                </div>
                <p className="p-2">{question.title}</p>
                <div className="p-2 space-y-2">
                  {question.chooses.map((choice: any, ind: number) => {
                    return (
                      <div
                        key={ind}
                        className={`flex gap-2 p-2 ${
                          (feedbackVisible &&
                            selectedChoices[index + 1] &&
                            choice.isAnswer &&
                            "bg-green-200 dark:bg-green-700") ||
                          (isSelectedAll && choice.isAnswer && "bg-green-200 dark:bg-green-700")
                        } ${
                          selectedChoices[index + 1]?.choiceIndex ===
                            ind.toString() &&
                          feedbackVisible &&
                          selectedChoices[index + 1]?.isCorrect
                            ? "bg-green-200 dark:bg-green-700"
                            : feedbackVisible &&
                              selectedChoices[index + 1]?.choiceIndex ===
                                ind.toString()
                            ? "bg-red-200 dark:bg-red-700"
                            : ""
                        }`}
                      >
                        <button
                          disabled={
                            (selectedChoices[index + 1] && feedbackVisible) ||
                            isSelectedAll
                          }
                          onClick={() => {
                            onSelectionChanged(
                              index + 1,
                              ind.toString(),
                              choice.isAnswer
                            );
                          }}
                          className={`h-4 w-4 disabled:cursor-not-allowed disabled:outline-blue-400 disabled:dark:outline-blue-600 outline outline-2 border-2  dark:border-gray-700 border-white dark:outline-blue-700 outline-blue-500 rounded-full  ${
                            selectedChoices[index + 1]?.choiceIndex ===
                            ind.toString()
                              ? "bg-blue-400  dark:bg-blue-800 disabled:dark:bg-blue-700 disabled:bg-blue-300"
                              : "bg-white dark:bg-gray-700"
                          }`}
                        ></button>
                        <p>{choice.text}</p>
                      </div>
                    );
                  })}
                </div>
                {(selectedChoices[index + 1] && feedbackVisible) ||
                isSelectedAll ? (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-none">
                      <AccordionTrigger className="hover:no-underline justify-start">
                        
                        <p className="text-lg">
                        Explanation
                        </p>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="p-2 bg-green-50 dark:bg-gray-700">
                        <div className="text-[14px]" dangerouslySetInnerHTML={{__html:question.explanation}}></div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  ""
                )}
              </div>
            );
          })}

          <div className="flex justify-end p-4 ">
            <Dialog>
              <DialogTrigger>
                <button 
      onClick={onSubmit}
       className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit
       </button>
              </DialogTrigger>
              <DialogContent className="bg-white dark:bg-gray-700 rounded-[10px]" >
                <div className="flex justify-center w-full">
                  <div className="w-48 h-48 flex justify-center items-center rounded-full border-2">
                    <p className="text-2xl font-bold">
                      {score}/{Questions.length}
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </SubLayout>
    </MainLayout>
  );
};

export default QuestionComponent;