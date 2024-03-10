import Navbar from "@/components/navbar/Navbar";
import EUEEYearExamsClientPage from "./yearClient";
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";


const EUEEYearExamsPage = async({params}:{
  params:{
    subject:string,
    year:string
  }
}) => {
  


  const examQuestions=await getQuestionsByCategory("EUEE","Highschool",params.year,params.subject);
  return (<><Navbar/><EUEEYearExamsClientPage subject={params.subject} year={params.year} Questions={examQuestions}/>
  </>)
 
};

export default EUEEYearExamsPage;