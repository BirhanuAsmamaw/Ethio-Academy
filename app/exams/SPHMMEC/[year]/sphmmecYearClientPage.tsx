"use client";

import QuestionComponent from "@/components/question/question";

interface SPHMMECClientPageProps{
    year:string,
    Questions:any[];
}
const SPHMMECClientPage:React.FC<SPHMMECClientPageProps> = ({year,Questions}) => {
  

  return <QuestionComponent  Questions={Questions} notificationTitle={`There is No COC Exams in ${year} Year`} notificationUrl={"/exams/SPHMMEC"} notificationLabel={"Click Here and See COC Exams in Others Years"} examsTitle={`COC Exams in ${year} Year`}/>
         

};

export default SPHMMECClientPage;