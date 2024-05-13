
import Bank from "./bank";
import PaymentForm from "./paymentForm";
import PaymentCourse from "./paymentCourse";
import Navbar from "@/components/navbar/Navbar";
import { getCurrentUser } from "@/actions/users/currentUser";
import { getAllUsers } from "@/actions/users/getAllUsers";
import { getAllBanks } from "@/actions/bank/getAllBanks";

const Payment = async() => {

  const user=await getCurrentUser();
  const users=await getAllUsers();
  const banks=await getAllBanks();

  const admins = users
  ?.filter(user => user.permissions.some(permission => permission.permission.action === "CanApproveCoursePayment"))
  .map(user => ({
    id: user.id,
    name: user.name,
    email: user.email
  }));

  return ( <>
  <Navbar/>
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
      <PaymentForm admins={admins||[]} user={user} banks={banks|| null}/>
      </div>
    </div>
  </div> </>);
}
 
export default Payment;