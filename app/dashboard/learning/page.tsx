"use client"

import LearningClient from "./learningClient";
import { useEnrolledCoursesQuery } from "@/redux/features/course/courseApi";



const MyLearning = () => {

  const {data:enrolledCourses,isSuccess,isLoading}=useEnrolledCoursesQuery();




  if(isLoading){
    return <div className="w-full h-screen flex justify-center items-center">
      <p>Loading ...</p>
    </div>
  }

const myPayedCourses=isSuccess&&enrolledCourses?.map((c:any)=>({course
:c.course.course
  ,status:true}
))

console.log("courses enrolled",myPayedCourses)




// const examsTaken=user.payedCourses.filter(course=>!course.courses.length).map((course=>({
//    id: course.id,
//    exam: course.department?.departmentName,
//    status: course.status
// })))



 
  return (<div className="w-full flex justify-center p-4">
    <LearningClient  exams={[]} courses={[]}/>
  </div>);
}
 
export default MyLearning;