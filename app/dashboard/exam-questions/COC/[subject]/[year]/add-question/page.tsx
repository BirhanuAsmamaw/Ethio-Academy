import { getDepartmentByName } from "@/actions/departments/getDepartmentByName";
import { getSubjectById } from "@/actions/subject/getSubjectById";
import { getAllUniversity } from "@/actions/university/getAllUniversity";
import CreateExamsClient from "@/components/question/createExamQuestion";




const AddExitQuestionPage = async({params}:{
  params:{
   
    year:string,
    subject:string
  }
}) => {

  const department = await getDepartmentByName("Freshman")
  const subject=await getSubjectById(params.subject)
  const university=await getAllUniversity();

  return ( <CreateExamsClient isCoc={true} university={university} department={department} year={params.year} subject={subject}/> );
}
 
export default AddExitQuestionPage;