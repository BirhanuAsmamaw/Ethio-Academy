import Navbar from "@/components/navbar/Navbar";
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";
import AAUMECClientPage from "./aaumecYearClientPage";



const AAUMECYearExamsPage = async({params}:{
  params:{
    year:string
  }
}) => {
  


  const examQuestions=await getQuestionsByCategory("AAU  Medicine Entrance COC","AAUMEC",params.year);
  return (<><Navbar/><AAUMECClientPage year={params.year} Questions={examQuestions}/>
  </>)
 
};

export default AAUMECYearExamsPage;