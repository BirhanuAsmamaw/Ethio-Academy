import { getDepartmentByName } from "@/actions/departments/getDepartmentByName";
import CreateExamsClient from "@/app/dashboard/exam-questions/createExamQuestion";



const AddExitQuestionPage = async({params}:{
  params:{
   
    year:string,
    subject:string
  }
}) => {

  const department = await getDepartmentByName("Highschool")

  return ( <CreateExamsClient department={department} year={params.year} subject={params.subject}/> );
}
 
export default AddExitQuestionPage;