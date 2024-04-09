import { getDepartmentById } from "@/actions/departments/getDepartmentById";
import { getSubjectById } from "@/actions/subject/getSubjectById";
import { getAllUniversity } from "@/actions/university/getAllUniversity";
import CreateExamsClient from "@/components/question/createExamQuestion";




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



  return ( <CreateExamsClient subject={subject} department={department} university={university} year={params.year}/> );
}
 
export default AddExitQuestionPage;