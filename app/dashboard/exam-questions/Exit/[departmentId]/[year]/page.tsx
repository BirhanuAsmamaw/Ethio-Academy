
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";
import { getDepartmentById } from "@/actions/departments/getDepartmentById";
import Header from "@/components/Header";
import { ExitQuestiosClientPage } from "./ExitQuestionyearClient";


const ExitYearExamsPage = async({params}:{
  params:{
   departmentId:string,
    year:string
  }
}) => {
  
  

const department=await getDepartmentById(params.departmentId)
  const examQuestions=await getQuestionsByCategory("Exit",department?.url||"",params.year);
  return (<>
  <Header
    title={`${department?.departmentName} Exit Exams in ${params.year} year`}
    description={` ${department?.departmentName} Exit  Exams  || All ${department?.departmentName}  Exit  Exams  in ${params.year} year  With Answer and  Detail Exaplanations!`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>
  <ExitQuestiosClientPage  questions={examQuestions}/>
  </>)
 
};

export default ExitYearExamsPage;