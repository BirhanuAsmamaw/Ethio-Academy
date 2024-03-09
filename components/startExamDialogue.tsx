import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

interface StartExamDialogueProps{
  onCheckRightAnswer:()=>void;
  onShowAnswerAfterQuiz:()=>void;
}
const StartExamDialogue:React.FC<StartExamDialogueProps> = ({onCheckRightAnswer,onShowAnswerAfterQuiz}) => {
  return (
    <Dialog>
  <DialogTrigger>
  <div 
  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
   Start Exam</div>
  </DialogTrigger>
  <DialogContent>
  <div className="p-10 flex flex-col gap-4">
        <button
          onClick={onCheckRightAnswer}
          className="text-white bg-green-500 px-4 py-2 rounded-md mr-2 hover:bg-green-600 focus:outline-none"
        >
          Check Right Answer Now!
        </button>
        <button
          onClick={onShowAnswerAfterQuiz}
          className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Show Answers After Quiz
        </button>
      </div>
  </DialogContent>
</Dialog>
  )
}

export default StartExamDialogue