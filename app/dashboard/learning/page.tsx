
import { getCurrentUser } from "@/actions/users/currentUser";
import LearningClient from "./learningClient";



const MyLearning = async() => {


const user=await getCurrentUser();



if (!user) {
  return null;
}

const myPayedCourses=user.payedCourses.flatMap((course=>course.courses.map(c=>({...c.course,status:course.status}
))))




const examsTaken=user.payedCourses.filter(course=>!course.courses.length).map((course=>({
   id: course.id,
   exam: course.department?.departmentName,
   status: course.status
})))

console.log("mypayed exams:-",examsTaken)

 
  return (<div className="w-full flex justify-center p-4">
    <LearningClient  exams={examsTaken} courses={myPayedCourses}/>
  </div>);
}
 
export default MyLearning;