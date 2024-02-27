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
    url:`/mycourses`,
    type:'Success',
    title: `🌟 Your Course approved Succeffully!`,
    message: `🎉 ${payment.customer.name}; please start learning Your Course!`,
    customers:[customer]
};

const notificationReject= {
    url:`/mycourses`,
    type:'Danger',
    title: `Sorry!!, Your Course not approved`,
    message: `🎉 ${payment.customer.name};your payment is not correct; please call me at 0930793119`,
    customers:[customer]
};



const onApproved=()=>{

setIsLoading(true);
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
  setIsLoading(true);
    toast.success("You successfully Reject the Payment")
   axios.post('/api/notification',notificationReject).then(()=>{
      router.push('/dashboard/approved-courses') 
    }).catch((error)=>{}).finally(()=>{
      setIsLoading(false)}); 
   
}

  return (<div className="w-full flex flex-col justify-center items-center gap-10">

  <div className="">
    <Image height={600} width={400} src={payment.recit|| ''} alt="payment reciept"/>
  </div>
  
  
  
  
  
  
  <div id="detailed-pricing" className="w-full pb-10 flex justify-center overflow-x-auto">
  <div className="overflow-auto w-full flex flex-col items-center justify-center">
 
  
  
  
  <div className="flow-root">
  <dl className="-my-3 divide-y divide-gray-100 text-sm dark:divide-gray-700">
    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900 dark:text-white">Subjects</dt>
      <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200"><ul className=" ps-5 mt-2 space-y-1 list-disc list-inside pb-10">
  {payment.courses.map((course:any)=>{
    return <li key={course.id} className="text-gray-500 dark:text-gray-400 text-sm flex gap-4 p-1 border-b border-gray-200 dark:border-gray-700">
        <p>{course.subject}</p>
        <p className="text-rose-500 dark:text-green-400">{course.price}ETB</p>
        </li>
  })}
  
  </ul></dd>
    </div>

    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900 dark:text-white">Name</dt>
      <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{payment.customer.name}</dd>
    </div>

    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900 dark:text-white">Bank</dt>
      <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{payment.bank}</dd>
    </div>

    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900 dark:text-white">Price</dt>
      <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{payment.totalPrice}ETB</dd>
    </div>

    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900 dark:text-white">
         <Button 
        onClick={onApproved}
        isDisabled={Loading}
        title={Loading? "Loading..":"Approve"}
        />   </dt>
      <dt className="text-gray-700 sm:col-span-2 dark:text-gray-200">
      <Button 
    onClick={onReject}
        isDisabled={Loading}
        className="text-white block w-full
           bg-red-600 hover:bg-red-700 focus:ring-4 
           focus:ring-red-200 font-medium rounded-[10px]
            text-sm px-4 py-2.5 text-center dark:focus:ring-red-900"
        title={Loading? "Loading..":"Reject"}
        />  
      </dt>
    </div>
  </dl>
</div>

  
  </div>
  </div>
  
  
  
  
  
  
  
  </div> );
}
 
export default ApprovedPaymentClient;









