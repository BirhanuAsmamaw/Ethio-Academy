import { getDepartmentByName } from "@/actions/departments/getDepartmentByName";
import CreateExamsClient from "@/components/question/createExamQuestion";




const AddExitQuestionPage = async({params}:{
  params:{
   
    year:string,
    subject:string
  }
}) => {

  const department = await getDepartmentByName("Remedial")

  return ( <CreateExamsClient department={department} year={params.year} subject={params.subject}/> );
}
 
export default AddExitQuestionPage;