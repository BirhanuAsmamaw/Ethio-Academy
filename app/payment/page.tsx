
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

  const admins=users?.filter((u)=>u.role ==='ADMIN').map((a)=>{
    return {
      id:a.id,
     name:a.name,
    }
  });
  return ( <>
  <Navbar/>
  <div className="p-2 flex flex-col gap-10 w-full justify-center pb-20">

    <div className="p-4 mt-10  md:m-10 w-full ">
     
      <Bank 
       banks={banks ||null}
        />

      </div>
    


    <div className="w-full mt-10 md:mt-20 flex justify-center">
      <div className="flex flex-col gap-10">
        <PaymentCourse/>
      <PaymentForm admins={admins||[]} user={user} banks={banks|| null}/>
      </div>
    </div>
  </div> </>);
}
 
export default Payment;