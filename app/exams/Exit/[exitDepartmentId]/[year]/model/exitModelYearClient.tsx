"use client";
import QuestionComponent from "@/components/question/question";
import { useRouter } from "next/navigation";
interface ExitYearExamsClientPageProps{

    year:string,
    Questions:any[];
    department:any;
}
const ExitModelYearExamsClientPage:React.FC<ExitYearExamsClientPageProps> = ({department,year,Questions}) => {
 


  const router=useRouter()
  let currentYear=Number(year)
     const onPreviousYear = (): void => {
        if (currentYear > 2015) {
           currentYear=currentYear-1
         
        } else {
           currentYear=2016
        }
        router.push(`exams/Exit/${department.id}/${currentYear}/model?right=true`)
       
      };
      
      const onNext = (): void => {
        if (currentYear < 2016) {
           currentYear=currentYear+1
         
        } else {
           currentYear=2015
        }
        router.push(`exams/Exit/${department.id}/${currentYear}/model?right=true`)
      };
  
  
  
  
  
  
  
  
  return (<QuestionComponent 
    onNext={onNext} 
    onPrevious={onPreviousYear}
    Questions={Questions}
    notificationTitle={`There is No ${department.departmentName} Exit Exams in ${year} Year`}
    notificationUrl={`/exams/Exit/${department.id}/model`}
    notificationLabel={`Click Here and See ${department.url} Exit Exams in Others Years`} 
    examsTitle={`${department.departmentName} Exit Exams in ${year}`}/>)
};

export default ExitModelYearExamsClientPage;