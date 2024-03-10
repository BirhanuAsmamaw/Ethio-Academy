import Navbar from "@/components/navbar/Navbar";
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";
import RemedialYearExamsClientPage from "./remedialYearClient";


const RemedialYearExamsPage = async({params}:{
  params:{
    subject:string,
    year:string
  }
}) => {
  


  const examQuestions=await getQuestionsByCategory("Remedial","Freshman",params.year,params.subject);
  return (<><Navbar/><RemedialYearExamsClientPage subject={params.subject} year={params.year} Questions={examQuestions}/>
  </>)
 
};

export default RemedialYearExamsPage;