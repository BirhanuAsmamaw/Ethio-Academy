import Navbar from "@/components/navbar/Navbar";
import { getCurrentUser } from "@/actions/users/currentUser";
import BlurComponent from "@/components/blurcomponent";
import { getDepartmentById } from "@/actions/departments/getDepartmentById";
import Header from "@/components/Header";
import ExitModelYearExamsClientPage from "./exitModelYearClient";
import { getModelQuestionsByCategory } from "@/actions/questions/getModelByCategory";


const ExitModelYearExamsPage = async({params}:{
  params:{
   exitDepartmentId:string,
    year:string
  }
}) => {
  
  const user=await getCurrentUser();
  const isCoursePDepartment=user?.payedCourses.some((payedCourse) =>payedCourse.department?.departmentName===params.exitDepartmentId&&payedCourse?.status);

const department=await getDepartmentById(params.exitDepartmentId)
  const examQuestions=await getModelQuestionsByCategory("Exit",department?.departmentName||"",params.year);
  return (<>
  <Header
    title={`${department} Exit Exams in ${params.year} year`}
    description={` ${department} Exit  Exams  || All ${department}  Exit  Exams  in ${params.year} year  With Answer and  Detail Exaplanations!`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>
  <Navbar/>
  {isCoursePDepartment?"":<BlurComponent department={department} user={user} buyLabel={"Buy All Exit Exam Now!"} trayLabel={"See Tray Exams"}/>}
  <ExitModelYearExamsClientPage department={department} year={params.year} Questions={examQuestions}/>
  </>)
 
};

export default ExitModelYearExamsPage;