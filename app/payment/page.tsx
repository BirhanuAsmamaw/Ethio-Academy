import { bank_accounts } from "@/lib/bank_account";
import Bank from "./bank";
import PaymentForm from "./paymentForm";
import PaymentCourse from "./paymentCourse";
import Navbar from "@/components/navbar/Navbar";
import { getCurrentUser } from "@/actions/currentUser";
import { getAllUsers } from "@/actions/getAllUsers";

const Payment = async() => {

  const user=await getCurrentUser();
  const users=await getAllUsers();

  const admins=users?.filter((u)=>u.role ==='ADMIN').map((a)=>{
    return {
      id:a.id,
     name:a.name,
    }
  });
  return ( <>
  <Navbar/>
  <div className="p-2 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 w-full justify-around  pb-20">

    <div className="p-4 mt-10  md:m-10 w-full ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

     {
      bank_accounts.map((bank,index)=>{
        return  <Bank 
        key={index}
        bank_name={bank.bank_name}
        image={bank.image}
        name={bank.name}
        account_no={bank.account_no}
        />
      })
     }
      

      </div>
    </div>


    <div className="w-full mt-10 md:mt-20 flex justify-center">
      <div className="flex flex-col gap-10">
        <PaymentCourse/>
      <PaymentForm admins={admins||[]} user={user}/>
      </div>
    </div>
  </div> </>);
}
 
export default Payment;