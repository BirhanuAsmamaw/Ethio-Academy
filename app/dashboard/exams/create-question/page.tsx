
import { getAllExamsCategory } from "@/actions/examsCategory/getAllExamsCategry";
import { getAllUniversity } from "@/actions/university/getAllUniversity";
import CreateExamsClient from "@/components/question/createExamQuestion";




const AddExitQuestionPage = async() => {

 
  const university=await getAllUniversity();
  const exams=await getAllExamsCategory();

 


  return ( <CreateExamsClient exams={exams|| null} university={university} /> );
}
 
export default AddExitQuestionPage;