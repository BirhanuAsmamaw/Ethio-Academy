import Navbar from "@/components/navbar/Navbar";
import COCYearExamsClientPage from "./yearClient";
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";
import { getCurrentUser } from "@/actions/users/currentUser";
import BlurComponent from "@/components/blurcomponent";
import { getDepartmentByName } from "@/actions/departments/getDepartmentByName";
import { getSubjectById } from "@/actions/subject/getSubjectById";


const COCYearExamsPage = async({params}:{
  params:{
    subject:string,
    year:string
  }
}) => {
  
  const user=await getCurrentUser();
  const subject=await getSubjectById(params.subject)
  const isCoursePDepartment=user?.payedCourses.some((payedCourse) =>payedCourse.department?.departmentName==="Freshman"&&payedCourse?.status);

const department=await getDepartmentByName("Freshman")
  const examQuestions=await getQuestionsByCategory("COC","Freshman",params.year,subject?.subjectName);
  return (<><Navbar/>
  {isCoursePDepartment?"":<BlurComponent department={department} user={user} buyLabel={"Buy All COC Exam Now!"} />}
  <COCYearExamsClientPage subject={subject} year={params.year} Questions={examQuestions}/>
  </>)
 
};

export default COCYearExamsPage;