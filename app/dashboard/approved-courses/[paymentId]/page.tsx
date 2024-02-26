import { getPaymentById } from "@/actions/getPaymentById";
import Image from "next/image";

const PaymentDetail = async({params}:{params:{paymentId:string}}) => {

  const payment=await getPaymentById(params.paymentId);

  if(!payment){
    return <div>No Payment details</div>
  }
  return ( <div className="w-full flex flex-col justify-center items-center gap-10">

          <div className="">
            <Image height={500} width={400} src={payment.recit|| ''} alt="payment reciept"/>
          </div>




         

<div id="detailed-pricing" className="w-full flex justify-center overflow-x-auto">
    <div className="overflow-hidden min-w-max">
        
        <div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
            <div className="text-gray-500 dark:text-gray-400">Basic components (<a href="#" className="text-blue-600 hover:underline">view all</a>)</div>
            <div>
                <svg className="w-3 h-3 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </div>
            <div>
                <svg className="w-3 h-3 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </div>
            <div>
                <svg className="w-3 h-3 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
            </div>
        </div>
        <div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
            <div className="text-gray-500 dark:text-gray-400">Bank</div>
            <div>
                {payment.bank}
            </div>
            <div className="text-gray-500 dark:text-gray-400">Transaction Id</div>
            <div>
                {payment.transaction}
            </div>
        </div>
        <div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
            <div className="text-gray-500 dark:text-gray-400">Price</div>
            <div>
                {payment.totalPrice}
            </div>
            <div className="text-gray-500 dark:text-gray-400">Transaction Id</div>
            
        </div>
        
       
        <div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
         
            <div>
                <button  className="text-white block w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-blue-900">Approved</button>
            </div>
            <div>
                <button className="text-white block w-full bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:focus:ring-red-900">Reject</button>
            </div>
            
        </div>
    </div>
</div>




          


  </div> );
}
 
export default PaymentDetail;