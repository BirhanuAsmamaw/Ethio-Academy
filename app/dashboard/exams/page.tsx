import { getAllExamsCategory } from "@/actions/examsCategory/getAllExamsCategry"
import ExamSubject from "./examSubject"
import ExamsDepartment from "./examsDepartment"
import ExamsTypes from "./examsTypes"


const ExamsCategory = async() => {
  const exams= await getAllExamsCategory();
  
  return ( <div className="py-10 flex flex-col bg-white px-4 dark:bg-gray-800 flex-col gap-10 min-h-screen w-full">



<ExamsTypes/>
<ExamsDepartment examTypes={exams||[]}/>
<ExamSubject/>

     



    
      </div>
  )
}

export default ExamsCategory