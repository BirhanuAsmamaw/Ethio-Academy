import { getPaymentById } from "@/actions/getPaymentById";
import Image from "next/image";

const PaymentDetail = async({params}:{params:{paymentId:string}}) => {

  const payment=await getPaymentById(params.paymentId);

  if(!payment){
    return <div>No Payment details</div>
  }
  return ( <div className="w-full flex flex-col justify-center items-center gap-10">

          <div className="">
            <Image height={400} width={370} src={payment.recit|| ''} alt="payment reciept"/>
          </div>
          <div className="w-full flex gap-10">
            <div>
            <p>TransactionId</p>
            <p>{payment.transaction}</p>
            </div>

            <div>
            <p>Bank Type</p>
            <p>{payment.bank}</p>
            </div>
          </div>
          <div className="">
            <p>{payment.totalPrice}</p>
          </div>
          <div className="">
            <button className="border rounded-[10px] px-2 py-1">Approve</button>
          </div>


  </div> );
}
 
export default PaymentDetail;