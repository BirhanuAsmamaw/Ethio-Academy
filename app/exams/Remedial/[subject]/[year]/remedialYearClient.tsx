"use client";

import QuestionComponent from "@/components/question/question";

interface RemedialYearExamsClientPageProps{
  subject:any,
    year:string,
    Questions:any[];
}
const RemedialYearExamsClientPage:React.FC<RemedialYearExamsClientPageProps> = ({subject,year,Questions}) => {
  
 



  return (<QuestionComponent  
    Questions={Questions} 
    notificationTitle={`There are No ${subject.subjectName} Exams in ${year} Year`}
    notificationUrl={`/exams/Remedial/${subject.id}`}
    
    notificationLabel={`Click Here and See ${subject.subjectName}Exams in Others Years`}
    examsTitle={`${subject.subjectName} in ${year} Remedial Exams`}/>)
};

export default RemedialYearExamsClientPage;