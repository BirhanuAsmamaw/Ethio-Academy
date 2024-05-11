
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
      name: payment.customer?.name,
      email: payment.customer.email,
      createdAt:payment.createdAt,
      
      exam: payment?.department,
      department: payment?.department?.departmentName,
      price: 100
      
    }
  })

 

  return ( <div className="py-10">
   <ApprovedCoursesClient coursesPayment={boughtCourses || null}/>
  </div> );
}
 
export default ApprovedCourses;