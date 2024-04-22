import { getDepartmentById } from "@/actions/departments/getDepartmentById";
import { getSubjectById } from "@/actions/subject/getSubjectById";
import { getAllUniversity } from "@/actions/university/getAllUniversity";





const AddExitQuestionPage = async({params}:{
  params:{
   departmentId:string,
    year:string,
    subjectId:string,
  }
}) => {

  const department = await getDepartmentById(params.departmentId);
  const university=await getAllUniversity();
  const subject = await getSubjectById(params.subjectId);



  return ( <div>
    <h1> un iumportant page!!!!!!</h1>
  </div>);
}
 
export default AddExitQuestionPage;