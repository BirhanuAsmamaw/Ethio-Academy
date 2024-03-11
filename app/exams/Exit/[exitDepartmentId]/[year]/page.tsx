import Navbar from "@/components/navbar/Navbar";
import ExitYearExamsClientPage from "./yearClient";
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";
import { getCurrentUser } from "@/actions/users/currentUser";
import BlurComponent from "@/components/blurcomponent";
import { getDepartmentById } from "@/actions/departments/getDepartmentById";


const ExitYearExamsPage = async({params}:{
  params:{
   exitDepartmentId:string,
    year:string
  }
}) => {
  
  const user=await getCurrentUser();
  const isCoursePDepartment=user?.payedCourses.some((payedCourse) =>payedCourse.department?.departmentName==="Highschool"&&payedCourse?.status);

const department=await getDepartmentById(params.exitDepartmentId)
  const examQuestions=await getQuestionsByCategory("Exit",params.exitDepartmentId,params.year);
  return (<><Navbar/>
  {isCoursePDepartment?"":<BlurComponent department={department} user={user} buyLabel={"Buy All Exit Exam Now!"} trayLabel={"See Tray Exams"}/>}
  <ExitYearExamsClientPage department={department} year={params.year} Questions={examQuestions}/>
  </>)
 
};

export default ExitYearExamsPage;