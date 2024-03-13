"use client";

import QuestionComponent from "@/components/question/question";

interface SPHMMECClientPageProps{
    year:string,
    Questions:any[];
}
const SPHMMECClientPage:React.FC<SPHMMECClientPageProps> = ({year,Questions}) => {
  

  return <QuestionComponent year={year} Questions={Questions}/>
         

};

export default SPHMMECClientPage;