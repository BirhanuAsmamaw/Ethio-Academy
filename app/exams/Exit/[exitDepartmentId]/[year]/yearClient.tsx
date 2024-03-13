"use client";
import QuestionComponent from "@/components/question/question";
interface ExitYearExamsClientPageProps{

    year:string,
    Questions:any[];
    department:any;
}
const ExitYearExamsClientPage:React.FC<ExitYearExamsClientPageProps> = ({department,year,Questions}) => {
 

  return (<QuestionComponent  
    Questions={Questions}
    notificationTitle={`There is No ${department.departmentName} Exit Exams in ${year} Year`}
    notificationUrl={`/exams/Exit/${department.id}`}
    notificationLabel={`Click Here and See ${department.departmentName} Exit Exams in Others Years`} 
    examsTitle={`${department.departmentName} Exit Exams in ${year}`}/>)
};

export default ExitYearExamsClientPage;