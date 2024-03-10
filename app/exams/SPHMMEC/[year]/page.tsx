import Navbar from "@/components/navbar/Navbar";
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";
import SPHMMECClientPage from "./sphmmecYearClientPage";


const SPHMMECYearExamsPage = async({params}:{
  params:{
    year:string
  }
}) => {
  


  const examQuestions=await getQuestionsByCategory("St.Paul's Hospital Millennium Medicine Entrance COC","SPHMMEC",params.year);
  return (<><Navbar/><SPHMMECClientPage year={params.year} Questions={examQuestions}/>
  </>)
 
};

export default SPHMMECYearExamsPage;