import Navbar from "@/components/navbar/Navbar";
import { getCurrentUser } from "@/actions/users/currentUser";
import BlurComponent from "@/components/blurcomponent";
import { getDepartmentByName } from "@/actions/departments/getDepartmentByName";
import { getModelQuestionsByCategory } from "@/actions/questions/getModelByCategory";
import ModelYearExamsClientPage from "./modelYearClient";
import { getSubjectById } from "@/actions/subject/getSubjectById";


const EUEEYearExamsPage = async({params}:{
  params:{
    subject:string,
    year:string
  }
}) => {
  
  const user=await getCurrentUser();
  const subject=await getSubjectById(params.subject)
  const isCoursePDepartment=user?.payedCourses.some((payedCourse) =>payedCourse.department?.departmentName==="Highschool"&&payedCourse?.status);

const department=await getDepartmentByName("Highschool")
  const examQuestions=await getModelQuestionsByCategory("EUEE","Highschool",params.year,true,subject?.id,'');
  return (<><Navbar/>
  {isCoursePDepartment?"":<BlurComponent department={department} user={user} buyLabel={"Buy All Subjects Exam Now!"} />}
 
  <ModelYearExamsClientPage subject={subject} year={params.year} Questions={examQuestions}/></>
 )
 
};

export default EUEEYearExamsPage;