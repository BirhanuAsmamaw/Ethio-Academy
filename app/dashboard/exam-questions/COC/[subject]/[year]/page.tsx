
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";

import { getSubjectById } from "@/actions/subject/getSubjectById";
import { COCYearExamsClientPage } from "./COCYearClient";


const COCYearExamsPage = async({params}:{
  params:{
    subject:string,
    year:string
  }
}) => {
  

  const subject=await getSubjectById(params.subject)
  const examQuestions=await getQuestionsByCategory("COC","Freshman",params.year,subject?.subjectName);
  const modifiedExamQuestions=examQuestions.map((question)=>{
    return{...question,subject:params.subject}
  })
  
  return (<>
  <COCYearExamsClientPage subject={subject} year={params.year} questions={modifiedExamQuestions}/>
  </>)
 
};

export default COCYearExamsPage;