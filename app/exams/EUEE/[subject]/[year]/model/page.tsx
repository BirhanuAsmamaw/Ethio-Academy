import Navbar from "@/components/navbar/Navbar";

import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";
import { getCurrentUser } from "@/actions/users/currentUser";
import BlurComponent from "@/components/blurcomponent";
import { getDepartmentByName } from "@/actions/departments/getDepartmentByName";
import EUEEYearExamsClientPage from "../yearClient";
import { getModelQuestionsByCategory } from "@/actions/questions/getModelByCategory";


const EUEEYearExamsPage = async({params}:{
  params:{
    subject:string,
    year:string
  }
}) => {
  
  const user=await getCurrentUser();
  const isCoursePDepartment=user?.payedCourses.some((payedCourse) =>payedCourse.department?.departmentName==="Highschool"&&payedCourse?.status);

const department=await getDepartmentByName("Highschool")
  const examQuestions=await getModelQuestionsByCategory("EUEE","Highschool",params.year,params.subject);
  return (<><Navbar/>
  {isCoursePDepartment?"":<BlurComponent department={department} user={user} buyLabel={"Buy All Subjects Exam Now!"} trayLabel={"See Tray Exams"}/>}
  <EUEEYearExamsClientPage title="model" subject={params.subject} year={params.year} Questions={examQuestions}/>
  </>)
 
};

export default EUEEYearExamsPage;