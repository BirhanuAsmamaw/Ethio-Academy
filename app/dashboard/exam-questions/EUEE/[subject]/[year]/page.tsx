
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";
import { EUEEYearExamsClientPage } from "./EUEEYearClient";
import { getSubjectById } from "@/actions/subject/getSubjectById";


const EUEEYearExamsPage = async({params}:{
  params:{
    subject:string,
    year:string
  }
}) => {
  

  const subject=await getSubjectById(params.subject)
  const examQuestions=await getQuestionsByCategory("EUEE","Highschool",params.year,subject?.subjectName);
  const modifiedExamQuestions=examQuestions.map((question)=>{
    return{...question,subject:params.subject}
  })
  
  return (<>
  <EUEEYearExamsClientPage subject={subject} year={params.year} questions={modifiedExamQuestions}/>
  </>)
 
};

export default EUEEYearExamsPage;