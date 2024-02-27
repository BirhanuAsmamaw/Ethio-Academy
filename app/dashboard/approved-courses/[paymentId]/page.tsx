
import { getPaymentById } from "@/actions/payments/getPaymentById";
import { UpdatedPaymentStatusById } from "@/actions/payments/updatedpaymentStatusById";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";

const PaymentDetail = async({params}:{params:{paymentId:string}}) => {

  const payment=await getPaymentById(params.paymentId);

  if(!payment){
    return <div>No Payment details</div>
  }


  const notificationSuccess = {
    url:`/dashboard/approved-courses}`,
    type:'Success',
    title: `🌟 Your Course approved Succeffully!`,
    message: `🎉 ${payment.customer.name}; please start learning Your Course!`,
    customers:[payment.customer]
};

const notificationReject= {
    url:`/dashboard/approved-courses}`,
    type:'Danger',
    title: `Sorry!!, Your Course not approved`,
    message: `🎉 ${payment.customer.name};your payment is not correct; please call me at 0930793119`,
    customers:[payment.customer]
};



const onApproved=async()=>{
    await UpdatedPaymentStatusById(payment.id)
    toast.success("You successfully Approved the Payment")
      axios.post('/api/notification',notificationSuccess);

    
}

const onReject=()=>{
    toast.success("You successfully Reject the Payment")
    axios.post('/api/notification',notificationReject);  
}

  return ( <div className="w-full flex flex-col justify-center items-center gap-10">

          <div className="">
            <Image height={600} width={400} src={payment.recit|| ''} alt="payment reciept"/>
          </div>




         

<div id="detailed-pricing" className="w-full pb-10 flex justify-center overflow-x-auto">
    <div className="overflow-hidden min-w-max">
    <h5 className="text-base text-gray-500 dark:text-gray-400 font-semibold "><span className="text-rose-500 dark:text-green-400">{payment.customer.name} </span>has bought the following <span className="text-rose-500 dark:text-green-400">{payment.courses.length} </span>courses</h5>
    <ul className=" ps-5 mt-2 space-y-1 list-disc list-inside pb-10">
         {payment.courses.map((course)=>{
            return <li key={course.id} className="text-gray-500 dark:text-gray-400 text-sm flex gap-4 p-1 border-b border-gray-200 dark:border-gray-700">
                <p>{course.subject}</p>
                <p className="text-rose-500 dark:text-green-400">{course.price}</p>
                </li>
         })}
        
      </ul>

        
        <div className="grid grid-cols-2 gap-10 w-full">
        <div className="grid grid-cols-2 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
            <div className="text-gray-500 dark:text-gray-400">Bank</div>
            <div className="text-rose-500 dark:text-green-400">
                {payment.bank}
            </div>
           
        </div>

        <div className="grid grid-cols-2 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
            <div className="text-gray-500 dark:text-gray-400">Transaction Id</div>
            <div className="text-rose-500 dark:text-green-400">
                {payment.transaction}
            </div>
        </div>
        </div>


        <div className="grid grid-cols-2 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
            <div className="text-gray-500 dark:text-gray-400">Price</div>
            <div className="text-rose-500 dark:text-green-400">
                {payment.totalPrice}
            </div>
            
        </div>
        
       
        <div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
         
            <div>
                <button onClick={onApproved}   className="rounded-[10px] text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900">Approved</button>
            </div>
            <div>
                <button onClick={onReject}  className="text-white block w-full bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-medium rounded-[10px] text-sm px-4 py-2.5 text-center dark:focus:ring-red-900">Reject</button>
            </div>
            
        </div>
    </div>
</div>




          


  </div> );
}
 
export default PaymentDetail;