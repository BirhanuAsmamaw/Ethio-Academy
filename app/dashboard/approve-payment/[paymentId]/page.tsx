"use client"
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
    return(<div>Loading</div>)

  }

  if(isError){
    return(<div>Error Occurred</div>)
  }
  return (<>
  {data&&isSuccess?  <div className='w-full p-4 min-h-screen flex justify-center items-center'>
    <div className="w-full md:max-w-2xl xl:w-1/2
    dark:shadow-black
    bg-white
     dark:bg-gray-800 p-4 space-y-2 rounded-md shadow-md
      shadow-slate-200">
        <div className="grid gap-20 text-left grid-cols-12 items-center">
          <p className='cols-span-2 font-medium'>Name:</p>
          <p className=' col-span-4'>{data.customer.name}</p>
        </div>

        <div className="grid grid-cols-12 text-center items-center">
          <p className='cols-span-2 font-medium'>Bank:</p>
          <p className=' col-span-6'>{data.bank}</p>
        </div>

        <div className="grid grid-cols-12 text-center items-center">
          <p className='cols-span-2 font-medium'>Transaction:</p>
          <p className=' col-span-6 '>{data.transaction}</p>
        </div>

        <div className="grid grid-cols-12 text-center items-center">
          <p className='cols-span-2 font-medium'>Total Price:</p>
          <p className=' col-span-6 text-left'>{data.totalPrice}</p>
        </div>
        <div className="grid grid-cols-12 text-center items-center">
          <p className='cols-span-2 font-medium'>Status:</p>
          <p className=' text-left col-span-6'>{data.status}</p>
        </div>

        <div className="">
          <Button disabled={approveLoading} onClick={onApprove}>{approveLoading? "Loading...":"Approve"}</Button>
        </div>
      </div>
  </div>:""}
  </>
  )
}

export default PaymentDetail