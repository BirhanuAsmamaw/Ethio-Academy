

import { getSubjectById } from "@/actions/subject/getSubjectById";
import DeleteSubjectClient from "./deleteSubjectClient";


const DeleteDepartment =async ({params}:{params:{subjectId:string}}) => {
 const subject=await getSubjectById(params.subjectId);
 
  return (<DeleteSubjectClient subject={subject}/>
  )
}

export default DeleteDepartment