"use client";

import QuestionComponent from "@/components/question/question";

interface EUEEYearExamsClientPageProps{
  subject:string,
    year:string,
    Questions:any[];
}
const EUEEYearExamsClientPage:React.FC<EUEEYearExamsClientPageProps> = ({subject,year,Questions}) => {
   return <QuestionComponent year={year} Questions={Questions}/>
};

export default EUEEYearExamsClientPage;