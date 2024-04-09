import { getDepartmentById } from "@/actions/departments/getDepartmentById";
import { getAllUniversity } from "@/actions/university/getAllUniversity";
import CreateExamsClient from "@/components/question/createExamQuestion";




const AddExitQuestionPage = async({params}:{
  params:{
   departmentId:string,
    year:string
  }
}) => {

  const department = await getDepartmentById(params.departmentId);
  const university=await getAllUniversity();



  return ( <CreateExamsClient department={department} university={university} year={params.year}/> );
}
 
export default AddExitQuestionPage;