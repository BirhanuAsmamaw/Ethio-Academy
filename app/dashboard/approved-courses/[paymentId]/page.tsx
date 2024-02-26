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
          <div className="w-full flex gap-10">
          <table className="table-fixed">
  
  <tbody>
    <tr>
      <th>Bank</th>
      <td>{payment.bank}</td>
    </tr>
    <tr>
      <th>TransactionId</th>
      <td>{payment.transaction}</td>
      
    </tr>
    <tr>
    <th>Price</th>
      <td>{payment.totalPrice}</td>
     
    </tr>
  </tbody>
  <tfoot>
  <div className="flex justify-end py-2 px-4">
            <button className="border rounded-[10px] bg-blue-600 hover:bg-blue-500 transition px-2 py-1">Approve</button>
          </div>
  </tfoot>
</table>
          </div>



          


  </div> );
}
 
export default PaymentDetail;