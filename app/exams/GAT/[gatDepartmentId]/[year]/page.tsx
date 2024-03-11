import Navbar from "@/components/navbar/Navbar";
import GATYearExamsClientPage from "./yearClient";
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";
import { getCurrentUser } from "@/actions/users/currentUser";
import BlurComponent from "@/components/blurcomponent";
import { getDepartmentById } from "@/actions/departments/getDepartmentById";


const GATYearExamsPage = async({params}:{
  params:{
   gatDepartmentId:string,
    year:string
  }
}) => {
  
  const user=await getCurrentUser();
  const isCoursePDepartment=user?.payedCourses.some((payedCourse) =>payedCourse.department?.departmentName===params.gatDepartmentId&&payedCourse?.status);

const department=await getDepartmentById(params.gatDepartmentId)
  const examQuestions=await getQuestionsByCategory("GAT",params.gatDepartmentId,params.year);
  return (<><Navbar/>
  {isCoursePDepartment?"":<BlurComponent department={department} user={user} buyLabel={"Buy All GAT Exam Now!"} trayLabel={"See Tray Exams"}/>}
  <GATYearExamsClientPage department={department} year={params.year} Questions={examQuestions}/>
  </>)
 
};

export default GATYearExamsPage;