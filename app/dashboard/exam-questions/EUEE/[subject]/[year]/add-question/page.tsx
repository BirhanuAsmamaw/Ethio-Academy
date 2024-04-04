import { getDepartmentByName } from "@/actions/departments/getDepartmentByName";
import { getSubjectById } from "@/actions/subject/getSubjectById";
import CreateExamsClient from "@/app/dashboard/exam-questions/createExamQuestion";



const AddExitQuestionPage = async({params}:{
  params:{
   
    year:string,
    subject:string
  }
}) => {

  const department = await getDepartmentByName("Highschool")
  const subject=await getSubjectById(params.subject)

  return ( <CreateExamsClient department={department} year={params.year} subject={subject}/> );
}
 
export default AddExitQuestionPage;