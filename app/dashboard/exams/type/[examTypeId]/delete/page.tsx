import { getExamTypeById } from "@/actions/examsCategory/getExamTypeById"
import DeleteExamTypeClient from "./deleteExamTypeClient"

const ExamTypeDelete = async({params}:{params:{examTypeId:string}}) => {
  const exam=await getExamTypeById(params.examTypeId)
 
  return (<DeleteExamTypeClient exam={exam}/>
  )
}

export default ExamTypeDelete