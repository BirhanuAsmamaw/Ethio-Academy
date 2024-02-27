import { getPaymentById } from "@/actions/payments/getPaymentById";
import ApprovedPaymentClient from "./ApprovedPaymentClient";

const PaymentDetail = async({params}:{params:{paymentId:string}}) => {

    const payment=await getPaymentById(params.paymentId);
    return (<div className="min-h-screen ">
        <h1>Payment details {payment?.bank}</h1>
    </div> );
}
 
export default PaymentDetail;