import Navbar from "@/components/navbar/Navbar";
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";
import AAUMECClientPage from "./aaumecYearClientPage";
import { getDepartmentByName } from "@/actions/departments/getDepartmentByName";
import { getCurrentUser } from "@/actions/users/currentUser";
import BlurComponent from "@/components/blurcomponent";



const AAUMECYearExamsPage = async({params}:{
  params:{
    year:string
  }
}) => {
  

  const user=await getCurrentUser();
  const isCoursePDepartment=user?.payedCourses.some((payedCourse) =>payedCourse.department?.departmentName==="AAUMEC"&&payedCourse?.status);

const department=await getDepartmentByName("AAUMEC")
  const examQuestions=await getQuestionsByCategory("AAU  Medicine Entrance COC","AAUMEC",params.year);
  return (<><Navbar/>
   {isCoursePDepartment?"":<BlurComponent department={department} user={user} buyLabel={"Buy All COC Exam Now!"} />}
  <AAUMECClientPage year={params.year} Questions={examQuestions}/>
  </>)
 
};

export default AAUMECYearExamsPage;