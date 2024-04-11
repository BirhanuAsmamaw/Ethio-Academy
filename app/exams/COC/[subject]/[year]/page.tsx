import Navbar from "@/components/navbar/Navbar";
import COCYearExamsClientPage from "./yearClient";
import { getCurrentUser } from "@/actions/users/currentUser";
import BlurComponent from "@/components/blurcomponent";
import { getDepartmentByName } from "@/actions/departments/getDepartmentByName";
import { getSubjectById } from "@/actions/subject/getSubjectById";
import { getLeftSide } from "@/lib/getleftSideWord";
import { getUniversityByCode } from "@/actions/university/getUniversityByCode";
import { getCOCQuestionsByCategory } from "@/actions/questions/getCocExams";


const COCYearExamsPage = async({params,searchParams}:{
  params:{
    subject:string,
    year:string
  },
  searchParams?:{ [key: string]: string | undefined };
}) => {
  const universityId=getLeftSide(searchParams?.university||"")
  const user=await getCurrentUser();
  const department=await getDepartmentByName("Freshman")
  const subject=await getSubjectById(params.subject)
  const isCoursePDepartment=user?.payedCourses.some((payedCourse) =>payedCourse.department?.departmentName===department?.id&&payedCourse?.status);
  const university=await getUniversityByCode(universityId)

  const examQuestions=await getCOCQuestionsByCategory("COC","Freshman",params.year,subject?.subjectName||"",university?.code);
  return (<><Navbar/>
  {isCoursePDepartment?"":<BlurComponent department={department} user={user} buyLabel={"Buy COC Exam Now!"} />}
  <COCYearExamsClientPage university={university} subject={subject} year={params.year} Questions={examQuestions}/>
  </>)
 
};

export default COCYearExamsPage;