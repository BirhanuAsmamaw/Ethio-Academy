import Navbar from "@/components/navbar/Navbar";
import { getQuestionsByCategory } from "@/actions/questions/getQuestionsByCategory";
import SPHMMECClientPage from "./sphmmecYearClientPage";
import { getCurrentUser } from "@/actions/users/currentUser";
import { getDepartmentByName } from "@/actions/departments/getDepartmentByName";
import BlurComponent from "@/components/blurcomponent";


const SPHMMECYearExamsPage = async({params}:{
  params:{
    year:string
  }
}) => {
  
  const user=await getCurrentUser();
  const isCoursePDepartment=user?.payedCourses.some((payedCourse) =>payedCourse.department?.departmentName==="Highschool"&&payedCourse?.status);

const department=await getDepartmentByName("SPHMMEC")

  const examQuestions=await getQuestionsByCategory("St.Paul's Hospital Millennium Medicine Entrance COC","SPHMMEC",params.year);
  return (<><Navbar/>
     {isCoursePDepartment?"":<BlurComponent department={department} user={user} buyLabel={"Buy All COC Exam Now!"} />}
  <SPHMMECClientPage year={params.year} Questions={examQuestions}/>
  </>)
 
};

export default SPHMMECYearExamsPage;