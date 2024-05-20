"use client"
import TableSkeleton from "@/components/tableSkeleton";

import { PaymentListClient } from "./approvePaymentClienet";
import { usePaymentListQuery } from "@/redux/features/payments/paymentApi";

const PaymentListPage= () => {
    
     const { data:payments, isSuccess,isLoading } = usePaymentListQuery();
  
     const paymentsData=payments?payments:[];
     if (isLoading){
      return <TableSkeleton/>
    }
  
    const mappedPaymentData=paymentsData.map((payment)=>({
      ...payment,
      course_no:payment?.courses?.length,
      department:payment?.department?.departmentName,
      name:payment?.customer.name
    }))
    return (<>{paymentsData&&isSuccess?<PaymentListClient payments={mappedPaymentData}/>:""}</>
    )
  }
  
  export default PaymentListPage;