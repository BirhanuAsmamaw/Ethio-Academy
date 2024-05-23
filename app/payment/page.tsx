
import Bank from "./bank";
import PaymentForm from "./paymentForm";
import PaymentCourse from "./paymentCourse";
import Navbar from "@/components/navbar/Navbar";
import { getCurrentUser } from "@/actions/users/currentUser";
import { getAllBanks } from "@/actions/bank/getAllBanks";
import Header from "@/components/Header";

const Payment = async() => {

  const user=await getCurrentUser();
  const banks=await getAllBanks();



  
  return ( <>
  <Navbar/>
  <Header
  keywords='EthioAcademy, payment, tuition fees, online payment, secure payment, easy payment options, student fees, instructor payments, education payments'
  description='Secure and easy payment options at EthioAcademy. Pay your tuition fees and other charges online with confidence. Explore various payment methods tailored for both students and instructors.'
  title='EthioAcademy Payment Options | Secure and Easy Online Payments'
/>

  <div className="p-2 py-20 flex flex-col gap-10 w-full justify-center pb-20">

    <div className="p-4  w-full flex justify-center ">
      <div className="w-full md:w-[500px]">
     
     
      <Bank 
       banks={banks ||null}
        />
 </div>
      </div>
    


    <div className="w-full   flex justify-center">
      <div className="flex flex-col gap-10">
        <PaymentCourse/>
      <PaymentForm  user={user} banks={banks|| null}/>
      </div>
    </div>
  </div> </>);
}
 
export default Payment;