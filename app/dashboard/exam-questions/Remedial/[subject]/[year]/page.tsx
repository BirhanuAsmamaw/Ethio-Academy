
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";
import { RemedialYearExamsClientPage } from "./RemedialYearClient";
import { getSubjectById } from "@/actions/subject/getSubjectById";


const RemedialYearExamsPage = async({params}:{
  params:{
    subject:string,
    year:string
  }
}) => {
  

  
  const examQuestions=await getQuestionsByCategory("Remedial","Highschool",params.year,params.subject);
  const subject=await getSubjectById(params.subject);
  return (<>
  <RemedialYearExamsClientPage subject={subject} year={params.year} questions={examQuestions}/>
  </>)
 
};

export default RemedialYearExamsPage;