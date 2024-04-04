
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";
import { RemedialYearExamsClientPage } from "./RemedialYearClient";


const RemedialYearExamsPage = async({params}:{
  params:{
    subject:string,
    year:string
  }
}) => {
  

  
  const examQuestions=await getQuestionsByCategory("Remedial","Highschool",params.year,params.subject);
  return (<>
  <RemedialYearExamsClientPage subject={params.subject} year={params.year} questions={examQuestions}/>
  </>)
 
};

export default RemedialYearExamsPage;