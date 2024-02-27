"use client"

import Button from "@/components/button/button";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

 interface ApprovedPaymentClientProps{
  payment:any;
 }
const ApprovedPaymentClient:React.FC<ApprovedPaymentClientProps> = ({payment}) => {

const router=useRouter();
const [Loading,setIsLoading]=useState(false);

  if(!payment){
    return <div>No Payment details</div>
  }

const customer={
    id:payment.customer.id,
   name:payment.customer.name,
  }

  const notificationSuccess = {
    url:`/dashboard/approved-courses}`,
    type:'Success',
    title: `🌟 Your Course approved Succeffully!`,
    message: `🎉 ${payment.customer.name}; please start learning Your Course!`,
    customers:[customer]
};

const notificationReject= {
    url:`/dashboard/approved-courses}`,
    type:'Danger',
    title: `Sorry!!, Your Course not approved`,
    message: `🎉 ${payment.customer.name};your payment is not correct; please call me at 0930793119`,
    customers:[customer]
};



const onApproved=()=>{


      axios.put(`/api/payment/${payment.id}/approve-status`).then(()=>{
        toast.success("You successfully Approved the Payment")
        router.push('/dashboard/approved-courses')
      })
      .catch((error)=>{
        toast.error(error.message)
      
      }).finally(()=>{
        setIsLoading(false)
      });
    
      axios.post('/api/notification',notificationSuccess);
      

    
}

const onReject=()=>{
    toast.success("You successfully Reject the Payment")
   axios.post('/api/notification',notificationReject).then(()=>{
      router.push('/dashboard/approved-courses') 
    }); 
   
}

  return (<div className="w-full flex flex-col justify-center items-center gap-10">

  <div className="">
    <Image height={600} width={400} src={payment.recit|| ''} alt="payment reciept"/>
  </div>
  
  
  
  
  
  
  <div id="detailed-pricing" className="w-full pb-10 flex justify-center overflow-x-auto">
  <div className="overflow-auto w-full flex flex-col items-center justify-center">
  <h5 className="text-base text-gray-500 dark:text-gray-400 font-semibold "><span className="text-rose-500 dark:text-green-400">{payment.customer.name} </span>has bought the following <span className="text-rose-500 dark:text-green-400">{payment.courses.length} </span>courses</h5>
  <ul className=" ps-5 mt-2 space-y-1 list-disc list-inside pb-10">
  {payment.courses.map((course:any)=>{
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
        <Button 
        onClick={onApproved}
        isDisabled={Loading}
        title={Loading? "Loading..":"Approve"}
        />   
  
    </div>
    <div>
    <Button 
    onClick={onReject}
        isDisabled={Loading}
        className="text-white block w-full
           bg-red-600 hover:bg-red-700 focus:ring-4 
           focus:ring-red-200 font-medium rounded-[10px]
            text-sm px-4 py-2.5 text-center dark:focus:ring-red-900"
        title={Loading? "Loading..":"Reject"}
        />  
       
    </div>
    
  </div>
  </div>
  </div>
  
  
  
  
  
  
  
  </div> );
}
 
export default ApprovedPaymentClient;









