
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";
import { EUEEYearExamsClientPage } from "./EUEEYearClient";


const EUEEYearExamsPage = async({params}:{
  params:{
    subject:string,
    year:string
  }
}) => {
  

  
  const examQuestions=await getQuestionsByCategory("EUEE","Highschool",params.year,params.subject);
  return (<>
  <EUEEYearExamsClientPage  questions={examQuestions}/>
  </>)
 
};

export default EUEEYearExamsPage;