
import { getAllPayments } from "@/actions/payments/getAllPayments";
import { ApprovedCoursesClient } from "./approvedCoursesClient";

const ApprovedCourses = async() => {
  const approvedCourses=await getAllPayments();
  const boughtCourses=approvedCourses?.map(payment =>{
    return {  
      id: payment.id,
      totalPrice :payment.totalPrice,
      status: payment.status,
      transaction: payment.transaction,
      bank: payment.bank,
      name: payment.customer.name,
      email: payment.customer.email,
      createdAt:payment.createdAt,
      courses : payment.courses,
      
    }
  })

  console.log("bought", boughtCourses);
  console.log("approved", approvedCourses);

  return ( <div className="py-10">
    <div className="p-10">
      <p>{boughtCourses? boughtCourses[0].bank :"courses"}</p>
      <h1>{approvedCourses? approvedCourses[0].totalPrice :"zero price"}</h1>
    </div>
   <ApprovedCoursesClient coursesPayment={boughtCourses || null}/>
  </div> );
}
 
export default ApprovedCourses;