
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";

import { getSubjectById } from "@/actions/subject/getSubjectById";
import { ExamYearClientPage } from "./examYearClient";


const YearExamsPage = async({params}:{
  params:{
    subjectId:string,
    year:string
  }
}) => {
  

  const subject=await getSubjectById(params.subjectId)
  const examQuestions=await getQuestionsByCategory(subject?.department?.exam?.url||"",subject?.department.url||"",params.year,subject?.subjectName);
  const modifiedExamQuestions=examQuestions.map((question)=>{
    return{...question,subject:params.subjectId}
  })
  
  return (<>
  <ExamYearClientPage subject={subject} year={params.year} questions={modifiedExamQuestions}/>
  </>)
 
};

export default YearExamsPage;