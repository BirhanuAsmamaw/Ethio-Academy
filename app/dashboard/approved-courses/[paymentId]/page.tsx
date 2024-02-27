import { getPaymentById } from "@/actions/payments/getPaymentById";
import ApprovedPaymentClient from "./ApprovedPaymentClient";

const PaymentDetail = async({params}:{params:{paymentId:string}}) => {

    const payment=await getPaymentById(params.paymentId);
    return ( <ApprovedPaymentClient payment={payment}/> );
}
 
export default PaymentDetail;