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
const [LoadingApprove,setIsLoadingApprove]=useState(false);
const [LoadingReject,setIsLoadingReject]=useState(false);

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
    title: `🌟 Your  ${payment?.department? `${payment?.department?.departmentName} Exam`:'Course '} approved Succeffully!`,
    message: `🎉 ${payment.customer.name}; please start learning Your Course!`,
    customers:[customer]
};

const notificationReject= {
    url:`/mycourses`,
    type:'Danger',
    title: `Sorry!!, The  ${payment?.department? `${payment?.department?.departmentName} Exam`:'Course '} not approved`,
    message: `🎉 ${`${payment.customer.name};your payment is not correct; please call me at 0930793119`}`,
    customers:[customer]
};

const onApproved=()=>{

setIsLoadingApprove(true);
      axios.put(`/api/payment/${payment.id}/approve-status`).then(()=>{
        toast.success("You successfully Approved the Payment")
        router.push('/dashboard/approved-courses')
      })
      .catch((error)=>{
        toast.error(error.message)
      
      }).finally(()=>{
        setIsLoadingApprove(false)
      });
    
      axios.post('/api/notification',notificationSuccess);
      

    
}

const onReject=()=>{
  setIsLoadingReject(true);
    toast.success("You successfully Reject the Payment")
   axios.post('/api/notification',notificationReject).then(()=>{
      router.push('/dashboard/approved-courses') 
    }).catch((error)=>{}).finally(()=>{
      setIsLoadingReject(false)}); 
   
}

  return (<div className="w-full flex flex-col justify-center items-center gap-10">

  
  
  
  
  
  
  
  <div id="detailed-pricing" className="w-full pb-10 flex justify-center overflow-x-auto">
  <div className="overflow-auto w-full flex flex-col items-center justify-center">
 
  
  
  
  <div className="flow-root w-full flex-center md:p-10">
  <dl className="-my-3 divide-y divide-gray-300 text-sm dark:divide-gray-700">
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

    {payment?.department?.departmentName?<div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900 dark:text-white">Exam</dt>
      <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{payment?.department?.departmentName} exam</dd>
    </div>:""}

    {payment?.department?.price?<div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900 dark:text-white">Exam Price</dt>
      <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{payment?.department?.price} ETB</dd>
    </div>:""}

    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900 dark:text-white">Bank</dt>
      <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{payment.bank}</dd>
    </div>
    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900 dark:text-white">Transaction Id</dt>
      <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{payment.transaction}</dd>
    </div>

    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900 dark:text-white">Price</dt>
      <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{payment.totalPrice}ETB</dd>
    </div>

    <div className="grid grid-cols-2 gap-1 py-4 px-2  sm:gap-4">
      <dt className="font-medium text-gray-900 dark:text-white">
         <Button 
        onClick={onApproved}
        isDisabled={LoadingApprove}
        title={LoadingApprove? "Loading..":"Approve"}
        />   </dt>
      <dt className="font-medium text-gray-900 dark:text-white">
      <Button 
    onClick={onReject}
        isDisabled={LoadingReject}
        className="
           bg-red-600  text-center dark:bg-red-600 hover:bg-red-700 dark:focus:ring-red-900"
        title={LoadingReject? "Loading..":"Reject"}
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









