
import { getQuestionById } from '@/actions/questions/getQuestionById'
import EditQuestionComponent from '@/components/edit-question/EditQuestion'

const EditQuestion = async({params}:{params:{questionId:string}}) => {
  const question=await getQuestionById(params.questionId)
  return (<EditQuestionComponent question={question}/>
  )
}

export default EditQuestion