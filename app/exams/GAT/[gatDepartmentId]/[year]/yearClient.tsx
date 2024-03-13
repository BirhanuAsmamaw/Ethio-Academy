"use client";
import QuestionComponent from "@/components/question/question";
interface GATYearExamsClientPageProps{

    year:string,
    Questions:any[];
    department:any;
}
const GATYearExamsClientPage:React.FC<GATYearExamsClientPageProps> = ({department,year,Questions}) => {
 
  
  return (<QuestionComponent  
    Questions={Questions} 
    notificationTitle={`There are No GAT Exams in ${year} Year`}
    notificationUrl={`/exams/GAT/${department.id}`}
    
    notificationLabel={`Click Here and See ${department.departmentName} GAT Exams in Others Years`}
    examsTitle={`GAT Exams in ${year} Year`}/>)
  
};

export default GATYearExamsClientPage;