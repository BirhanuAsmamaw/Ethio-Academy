"use client";
import QuestionComponent from "@/components/question/question";
interface AAUMECClientPageProps{
    year:string,
    Questions:any[];
}
const AAUMECClientPage:React.FC<AAUMECClientPageProps> = ({year,Questions}) => {

  return (<QuestionComponent  
    Questions={Questions} 
    notificationTitle={`There is No COC Exams in ${year} Year`} 
    notificationUrl={`/exams/AAUMEC`} 
    
    notificationLabel={`Click Here and See COC Exams in Others Years`}
    examsTitle={`COC Exams in ${year} Year`}/>
  );
};

export default AAUMECClientPage;