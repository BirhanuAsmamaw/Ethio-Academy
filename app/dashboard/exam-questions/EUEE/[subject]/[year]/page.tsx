
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";
import { EUEEYearExamsClientPage } from "./EUEEYearClient";
import { getSubjectById } from "@/actions/subject/getSubjectById";


const EUEEYearExamsPage = async({params}:{
  params:{
    subject:string,
    year:string
  }
}) => {
  

  
  const examQuestions=await getQuestionsByCategory("EUEE","Highschool",params.year,params.subject);
  const subject=await getSubjectById(params.subject)
  return (<>
  <EUEEYearExamsClientPage subject={subject} year={params.year} questions={examQuestions}/>
  </>)
 
};

export default EUEEYearExamsPage;