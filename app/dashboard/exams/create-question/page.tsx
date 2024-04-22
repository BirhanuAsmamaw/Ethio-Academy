
import { getAllExamsCategory } from "@/actions/examsCategory/getAllExamsCategry";
import { getAllUniversity } from "@/actions/university/getAllUniversity";
import CreateExamsClient from "@/components/question/createExamQuestion";




const AddExitQuestionPage = async() => {

 
  const university=await getAllUniversity();
  const exams=await getAllExamsCategory();

 

if(!exams||exams.length){
    return null;
}

  return ( <CreateExamsClient exams={exams} university={university} /> );
}
 
export default AddExitQuestionPage;