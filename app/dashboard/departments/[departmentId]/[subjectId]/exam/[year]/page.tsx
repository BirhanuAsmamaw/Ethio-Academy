
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";

import { getSubjectById } from "@/actions/subject/getSubjectById";
import { ExamYearClientPage } from "./examYearClient";


const YearExamsPage = async({params}:{
  params:{
    subjectId:string,
    departmentId:string
    year:string
  }
}) => {
  

  const subject=await getSubjectById(params.subjectId)
  const examQuestions=await getQuestionsByCategory(subject?.department?.exam?.url||"",subject?.department.url||"",params.year,subject?.id);
 
  
  return (<>
  <ExamYearClientPage departmentId={params.departmentId} subject={subject} year={params.year} questions={examQuestions}/>
  </>)
 
};

export default YearExamsPage;