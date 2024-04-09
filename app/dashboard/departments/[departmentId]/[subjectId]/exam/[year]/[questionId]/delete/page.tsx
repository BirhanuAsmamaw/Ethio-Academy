import { getQuestionById } from "@/actions/questions/getQuestionById"
import DeleteQustionClient from "./deleteQuestionClient"


const QuestionDeletePage = async({params}:{params:{questionId:string}}) => {
  const question=await getQuestionById(params.questionId)
 
  return (<DeleteQustionClient question={question}/>
  )
}

export default QuestionDeletePage