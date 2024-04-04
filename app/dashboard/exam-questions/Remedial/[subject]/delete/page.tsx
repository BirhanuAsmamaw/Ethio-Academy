
import DeleteSubjectClient from "./deleteSubjectExamClient";
import { getSubjectById } from "@/actions/subject/getSubjectById";


const DeleteDepartment =async ({params}:{params:{subject:string}}) => {
 const subject=await getSubjectById(params.subject);
 
  return (<DeleteSubjectClient subject={subject}/>
  )
}

export default DeleteDepartment