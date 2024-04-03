import { getDepartmentById } from "@/actions/departments/getDepartmentById";
import CreateExamsClient from "@/app/dashboard/exam-questions/createExamQuestion";



const AddExitQuestionPage = async({params}:{
  params:{
   departmentId:string,
    year:string
  }
}) => {

  const department = await getDepartmentById(params.departmentId);



  return ( <CreateExamsClient department={department} year={params.year}/> );
}
 
export default AddExitQuestionPage;