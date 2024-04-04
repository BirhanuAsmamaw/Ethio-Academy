"use client";

import Header from "@/components/Header";
import QuestionComponent from "@/components/question/question";
import { useRouter } from "next/navigation";


interface EUEEYearExamsClientPageProps{
  subject:any,
    year:string,
    Questions:any[];
}
const ModelYearExamsClientPage:React.FC<EUEEYearExamsClientPageProps> = ({subject,year,Questions}) => {


const router=useRouter()
let currentYear=Number(year)
   const onPreviousYear = (): void => {
      if (currentYear > 2010) {
         currentYear=currentYear-1
       
      } else {
         currentYear=2015
      }
      router.push(`/exams/EUEE/${subject.id}/${currentYear}/model`)
     
    };
    
    const onNext = (): void => {
      if (currentYear < 2015) {
         currentYear=currentYear+1
       
      } else {
         currentYear=2010
      }
      router.push(`/exams/EUEE/${subject.id}/${currentYear}/model`)
    };








   return  <>
   <Header
    title={`${subject.subjectName}  Exam in ${year} Year`}
    description={` ${subject.subjectName} Entrance Exams in ${year} Year  || All ${subject.subjectName} Exams in in ${year} Year  With Answer and  Detail Exaplanations!`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>
   <QuestionComponent 
   onNext={onNext} 
   onPrevious={onPreviousYear}
   Questions={Questions} 
   notificationTitle={`There is No ${subject.subjectName} Exams in ${year} Year`} 
   notificationUrl={`/exams/EUEE/${subject.id}`} 
   
   notificationLabel={`Click Here and See ${subject.subjectName} Exams in Others Years`} 
   examsTitle={`${subject.subjectName} Model Exam in ${year} Year`}/></>
};

export default ModelYearExamsClientPage;