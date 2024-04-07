
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";
import { RemedialYearExamsClientPage } from "./RemedialYearClient";
import { getSubjectById } from "@/actions/subject/getSubjectById";


const RemedialYearExamsPage = async({params}:{
  params:{
    subject:string,
    year:string
  }
}) => {
  
  const subject=await getSubjectById(params.subject);
  
  const examQuestions=await getQuestionsByCategory("Remedial","Highschool",params.year,subject?.subjectName);
 
  const modifiedExamQuestions=examQuestions.map((question)=>{
    return{...question,subject:params.subject}
  })
 
  return (<>
  <RemedialYearExamsClientPage subject={subject} year={params.year} questions={modifiedExamQuestions}/>
  </>)
 
};

export default RemedialYearExamsPage;