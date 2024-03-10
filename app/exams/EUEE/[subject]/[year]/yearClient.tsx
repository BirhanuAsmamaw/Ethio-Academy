"use client";
import MainLayout from "@/components/layouts/mainLayout";
import SubLayout from "@/components/layouts/subLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";
interface EUEEYearExamsClientPageProps{
  subject:string,
    year:string,
    Questions:any[];
}
const EUEEYearExamsClientPage:React.FC<EUEEYearExamsClientPageProps> = ({subject,year,Questions}) => {
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [isSelectedAll, setSelectedAll] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<any>({});
  const [mounted, setMounted] = useState(false);
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

  if (!mounted) return;

  return (
    <MainLayout>
      <SubLayout className="bg-white dark:bg-gray-800 dark:border-gray-700 border-gray-300 border-x-2 border-double">
        <div className="pt-10" id="quiz">
          <div className="p-2 py-10">
            <h4 className="text-lg font-semibold border-b-2 border-dashed">
              {subject} in {year} EUEE Exams
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
                            "bg-green-200") ||
                          (isSelectedAll && choice.isAnswer && "bg-green-200")
                        } ${
                          selectedChoices[index + 1]?.choiceIndex ===
                            ind.toString() &&
                          feedbackVisible &&
                          selectedChoices[index + 1]?.isCorrect
                            ? "bg-green-200"
                            : feedbackVisible &&
                              selectedChoices[index + 1]?.choiceIndex ===
                                ind.toString()
                            ? "bg-red-200"
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
                          className={`h-4 w-4 disabled:cursor-not-allowed disabled:outline-blue-400  outline outline-2 border-2 border-white outline-blue-500 rounded-full  ${
                            selectedChoices[index + 1]?.choiceIndex ===
                            ind.toString()
                              ? "bg-blue-400 disabled:bg-blue-300"
                              : "bg-white"
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
                      <AccordionTrigger className="hover:no-underline">
                        Explanation
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="p-2 bg-green-50">
                          <p>{question.explanation}</p>
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

export default EUEEYearExamsClientPage;