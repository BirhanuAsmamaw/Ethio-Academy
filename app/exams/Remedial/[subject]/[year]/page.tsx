import Navbar from "@/components/navbar/Navbar";
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";
import RemedialYearExamsClientPage from "./remedialYearClient";
import { getCurrentUser } from "@/actions/users/currentUser";
import { getDepartmentByName } from "@/actions/departments/getDepartmentByName";
import BlurComponent from "@/components/blurcomponent";


const RemedialYearExamsPage = async({params}:{
  params:{
    subject:string,
    year:string
  }
}) => {
  
  const user=await getCurrentUser();
  const isCoursePDepartment=user?.payedCourses.some((payedCourse) =>payedCourse.department?.departmentName==="Highschool"&&payedCourse?.status);

const department=await getDepartmentByName("Freshman")

  const examQuestions=await getQuestionsByCategory("Remedial","Freshman",params.year,params.subject);
  return (<><Navbar/>
     {isCoursePDepartment?"":<BlurComponent department={department} user={user} buyLabel={"Buy All COC Exam Now!"} trayLabel={"See Tray Exams"}/>}
  <RemedialYearExamsClientPage subject={params.subject} year={params.year} Questions={examQuestions}/>
  </>)
 
};

export default RemedialYearExamsPage;