import { getPaymentById } from "@/actions/getPaymentById";
import Image from "next/image";

const PaymentDetail = async({params}:{params:{paymentId:string}}) => {

  const payment=await getPaymentById(params.paymentId);

  if(!payment){
    return <div>No Payment details</div>
  }
  return ( <div className="w-full flex flex-col justify-center items-center gap-10">

          <div className="">
            <Image height={600} width={400} src={payment.recit|| ''} alt="payment reciept"/>
          </div>




         

<div id="detailed-pricing" className="w-full pb-10 flex justify-center overflow-x-auto">
    <h5 className="text-lg font-medium">{payment.customer.name} has bought the following {payment.courses.length} courses</h5>
    <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
         {payment.courses.map((course)=>{
            return <li key={course.id} className="flex gap-2 p-1 border-b border-gray-200 dark:border-gray-700">
                <p>{course.price}</p>
                </li>
         })}
        
      </ul>
    <div className="overflow-hidden min-w-max">
        
        
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
                <button  className="rounded-[10px] text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900">Approved</button>
            </div>
            <div>
                <button className="text-white block w-full bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-medium rounded-[10px] text-sm px-4 py-2.5 text-center dark:focus:ring-red-900">Reject</button>
            </div>
            
        </div>
    </div>
</div>




          


  </div> );
}
 
export default PaymentDetail;