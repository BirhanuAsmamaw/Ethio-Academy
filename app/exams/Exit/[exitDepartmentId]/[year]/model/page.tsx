import Navbar from "@/components/navbar/Navbar";
import { getCurrentUser } from "@/actions/users/currentUser";
import BlurComponent from "@/components/blurcomponent";
import { getDepartmentById } from "@/actions/departments/getDepartmentById";
import Header from "@/components/Header";
import ExitModelYearExamsClientPage from "./exitModelYearClient";
import { getModelQuestionsByCategory } from "@/actions/questions/getModelByCategory";
import { getLeftSide } from "@/lib/getleftSideWord";
import { getUniversityByCode } from "@/actions/university/getUniversityByCode";


const ExitModelYearExamsPage = async({params,searchParams,}:{
  params:{
   exitDepartmentId:string,
    year:string
  },
  searchParams?:{ [key: string]: string | undefined };
}) => {
  
  const universityId=getLeftSide(searchParams?.university||"")
  const user=await getCurrentUser();
  const isCoursePDepartment=user?.payedCourses.some((payedCourse) =>payedCourse.department?.departmentName===params.exitDepartmentId&&payedCourse?.status);
 const university=await getUniversityByCode(universityId)
const department=await getDepartmentById(params.exitDepartmentId)
  const examQuestions=await getModelQuestionsByCategory("Exit",department?.departmentName||"",params.year,true,'');
  return (<>
  <Header
    title={`${department?.departmentName} Exit Exams in ${params.year} year`}
    description={` ${department?.departmentName} Exit  Exams  || All ${department?.departmentName}  Exit  Exams  in ${params.year} year  With Answer and  Detail Exaplanations!`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>
  <Navbar/>
  {isCoursePDepartment?"":<BlurComponent department={department} user={user} buyLabel={"Buy All Exit Exam Now!"} />}
  
  <ExitModelYearExamsClientPage univerity={university} department={department} year={params.year} Questions={examQuestions}/>
 
  </>)
 
};

export default ExitModelYearExamsPage;