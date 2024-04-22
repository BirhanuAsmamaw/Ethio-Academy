import Navbar from "@/components/navbar/Navbar";
import EUEEYearExamsClientPage from "./yearClient";
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";
import { getCurrentUser } from "@/actions/users/currentUser";
import BlurComponent from "@/components/blurcomponent";
import { getDepartmentByName } from "@/actions/departments/getDepartmentByName";
import { getSubjectById } from "@/actions/subject/getSubjectById";


const EUEEYearExamsPage = async({params}:{
  params:{
    subject:string,
    year:string
  }
}) => {
  
  const user=await getCurrentUser();
  const subject=await getSubjectById(params.subject)
  const isCoursePDepartment=user?.payedCourses.some((payedCourse) =>payedCourse?.department?.departmentName==="Highschool"&&payedCourse?.status);

const department=await getDepartmentByName("Highschool")
  const examQuestions=await getQuestionsByCategory("EUEE","Highschool",params.year,subject?.id);
  return (<><Navbar/>
  {isCoursePDepartment?"":<BlurComponent department={department} user={user} buyLabel={"Buy All Subjects Exam Now!"} />}
  <EUEEYearExamsClientPage subject={subject} year={params.year} Questions={examQuestions}/>
  </>)
 
};

export default EUEEYearExamsPage;