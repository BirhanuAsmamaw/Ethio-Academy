import { getAllPayments } from "@/actions/getAllPayments";
import { ApprovedCoursesClient } from "./approvedCoursesClient";

const ApprovedCourses = async() => {
  const approvedCourses=await getAllPayments();

  return ( <div className="py-10">
   <ApprovedCoursesClient coursePayments={approvedCourses||[]}/>
  </div> );
}
 
export default ApprovedCourses;