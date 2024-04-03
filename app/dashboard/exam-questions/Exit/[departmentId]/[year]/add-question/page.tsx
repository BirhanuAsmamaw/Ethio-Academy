import CreateExamsClient from "@/app/dashboard/exam-questions/createExamQuestion";



const AddExitQuestionPage = ({params}:{
  params:{
   departmentId:string,
    year:string
  }
}) => {

  return ( <CreateExamsClient departmentId={params.departmentId} year={params.year}/> );
}
 
export default AddExitQuestionPage;