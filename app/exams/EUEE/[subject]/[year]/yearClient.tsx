"use client";

import QuestionComponent from "@/components/question/question";

interface EUEEYearExamsClientPageProps{
  subject:string,
    year:string,
    Questions:any[];
}
const EUEEYearExamsClientPage:React.FC<EUEEYearExamsClientPageProps> = ({subject,year,Questions}) => {
   return  <QuestionComponent  
   Questions={Questions} 
   notificationTitle={`There is No ${subject} Exams in ${year} Year`} 
   notificationUrl={`/exams/EUEE/${subject}`} 
   
   notificationLabel={`Click Here and See ${subject} Exams in Others Years`} 
   examsTitle={`${subject} Exams in ${year} Year`}/>
};

export default EUEEYearExamsClientPage;