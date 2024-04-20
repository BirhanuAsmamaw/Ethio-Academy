
import { getCurrentUser } from "@/actions/users/currentUser";
import LearningClient from "./learningClient";



const MyLearning = async() => {


const user=await getCurrentUser();



if (!user) {
  return null;
}

const myPayedCourses=user.payedCourses.flatMap((course=>course.courses.map(c=>({...c,status:course.status}
))))


const examsTaken=user.payedCourses.map((course=>({
   id: course.id,
   exam: course.department?.exam?.examType,
   status: course.status
})))


 
  return (<LearningClient courses={myPayedCourses} exams={examsTaken}/>);
}
 
export default MyLearning;