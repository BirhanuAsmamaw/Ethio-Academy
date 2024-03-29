"use client";

import Header from "@/components/Header";
import QuestionComponent from "@/components/question/question";
import { title } from "process";

interface EUEEYearExamsClientPageProps{
  subject:string,
    year:string,
    Questions:any[];
    title?:string;
}
const EUEEYearExamsClientPage:React.FC<EUEEYearExamsClientPageProps> = ({subject,year,Questions}) => {
   return  <>
   <Header
    title={`${subject}  Exam in ${year} Year`}
    description={` ${subject} Entrance Exams in ${year} Year  || All ${subject} Exams in in ${year} Year  With Answer and  Detail Exaplanations!`}
    keywords='Programming, High School Courses, Freshman Courses, Entrance Exams, Exit Exams, Online Education, Lifelong Learning'
/>
   <QuestionComponent  
   Questions={Questions} 
   notificationTitle={`There is No ${subject} Exams in ${year} Year`} 
   notificationUrl={`/exams/EUEE/${subject}`} 
   
   notificationLabel={`Click Here and See ${subject} Exams in Others Years`} 
   examsTitle={`${title? `${subject} ${title} Exams in ${year}`:`${subject} Exams in ${year}`} Year`}/></>
};

export default EUEEYearExamsClientPage;