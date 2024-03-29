import Navbar from "@/components/navbar/Navbar";
import { getCurrentUser } from "@/actions/users/currentUser";
import BlurComponent from "@/components/blurcomponent";
import { getDepartmentByName } from "@/actions/departments/getDepartmentByName";
import { getModelQuestionsByCategory } from "@/actions/questions/getModelByCategory";
import Header from "@/components/Header";
import QuestionComponent from "@/components/question/question";


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
 
   <Header
    title={`${params.subject}  Exam in ${params.year} Year`}
    description={` ${params.subject} Entrance Exams in ${params.year} Year  || All ${params.subject} Exams in in ${params.year} Year  With Answer and  Detail Exaplanations!`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>
   <QuestionComponent  
   Questions={examQuestions} 
   notificationTitle={`There is No ${params.subject} Exams in ${params.year} Year`} 
   notificationUrl={`/exams/EUEE/${params.subject}`} 
   
   notificationLabel={`Click Here and See ${params.subject} Exams in Others Years`} 
   examsTitle={`${params.subject} Model Exams in ${params.year} Year`}/></>
 )
 
};

export default EUEEYearExamsPage;