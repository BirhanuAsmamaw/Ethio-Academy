"use client"
import CardSceleton from '@/components/card/cardSceleton'
import { Button } from '@/components/ui/button'
import { useApproveStatusMutation, useGetPaymentQuery } from '@/redux/features/payments/paymentApi'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

const PaymentDetail = ({params}:{params:{paymentId:string}}) => {
  
  
  const {data,isSuccess,isError,isLoading}=useGetPaymentQuery(params.paymentId)
 const router=useRouter();

  const [approvePayment,{
    data:approveData,
    isSuccess:approveSuccess,
    isError:approveError,
    isLoading:approveLoading}]=useApproveStatusMutation();

    const onApprove=async()=>{
      await approvePayment(params.paymentId)
    }


    useEffect(()=>{
      if(approveSuccess){
        toast.success("approved successfully!")
        router.push("/dashboard/approve-payment")
      }
    },[approveSuccess])


  if(isLoading){
    return(<div className='w-full h-screen flex justify-center items-start p-4'>
      <CardSceleton/>

    </div>)

  }

  if(isError){
    return(<div>Error Occurred</div>)
  }
  return (<>
  {data&&isSuccess?  <div className='w-full p-4 min-h-screen flex justify-center items-center'>
    <div className="w-full md:max-w-2xl xl:w-1/2
    dark:shadow-black
    bg-white
    items-start
    justify-start
     text-left
     dark:bg-gray-800 px-4 py-8 space-y-4 rounded-md shadow-md
      shadow-slate-200">
        <div className="p-6">
          <h1 className='font-medium text-xl'>Payment Approval</h1>
        </div>


        <div className="grid gap-4 sm:gap-10 grid-cols-l sm:grid-cols-12 border-b-[1.5px] dark:border-gray-600 w-full text-left   items-start">
          <p className='col-span-4 text-left font-medium'>Name:</p>
          <p className=' col-span-8  text-left'>{data.customer.name}</p>
        </div>


        <div className="grid gap-4 sm:gap-10 grid-cols-l sm:grid-cols-12 border-b-[1.5px] dark:border-gray-600 w-full text-left   items-start">
          <p className='col-span-4 text-left font-medium'>Bank:</p>
          <p className=' col-span-8  text-left'>{data.bank}</p>
        </div>
        

        <div className="grid gap-4 sm:gap-10 grid-cols-l sm:grid-cols-12 border-b-[1.5px] dark:border-gray-600 w-full text-left  items-start">
          <p className='col-span-4 text-left font-medium'>Transaction:</p>
          <p className=' col-span-8  text-left'>{data.transaction}</p>
        </div>

        <div className="grid gap-4 sm:gap-10 grid-cols-l sm:grid-cols-12 border-b-[1.5px] dark:border-gray-600 w-full text-left   items-start">
          <p className='col-span-4 text-left font-medium'>Total Price:</p>
          <p className=' col-span-8  text-left'>{data.totalPrice}</p>
        </div>

        <div className="grid gap-4 sm:gap-10 grid-cols-l sm:grid-cols-12 border-b-[1.5px] dark:border-gray-600 w-full text-left   items-start">
          <p className='col-span-4 text-left font-medium'>Status:</p>
          <p className=' col-span-8 pb-1 text-left'>{data?.status? <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2 py-1  rounded-full dark:bg-green-900 dark:text-green-300">
            approved
          </span>: <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2 py-1  rounded-full dark:bg-yellow-900 dark:text-yellow-300">
            Pending...
          </span>}</p>
        </div>

        

        <div className="flex justify-end p-6 w-full">
          <Button
          className='py-1 px-2  text-white font-medium text-sm rounded-full bg-blue-500 hover:bg-blue-600'
           disabled={approveLoading} 
          onClick={onApprove}>{approveLoading? "Loading...":"Approve"}</Button>
        </div>
      </div>
  </div>:""}
  </>
  )
}

export default PaymentDetail