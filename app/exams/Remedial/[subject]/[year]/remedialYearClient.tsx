"use client";

import QuestionComponent from "@/components/question/question";

interface RemedialYearExamsClientPageProps{
  subject:string,
    year:string,
    Questions:any[];
}
const RemedialYearExamsClientPage:React.FC<RemedialYearExamsClientPageProps> = ({subject,year,Questions}) => {
  
 



  return (<QuestionComponent  
    Questions={Questions} 
    notificationTitle={`There are No ${subject} Exams in ${year} Year`}
    notificationUrl={`/exams/Remedial/${subject}`}
    
    notificationLabel={`Click Here and See ${subject} Exams in Others Years`}
    examsTitle={`${subject} in ${year} Remedial Exams`}/>)
};

export default RemedialYearExamsClientPage;