"use client"
import { useSubscribeAccountMutation } from '@/redux/features/subscribers/subscriberApi';
import React from 'react'

const SubscriberAccount = ({userId,accountId}:{userId:string,accountId:string}) => {
  const [subscribeAccount,{data,isLoading}]=useSubscribeAccountMutation();
  console.log("subscribe data:-",data)
const onSubscribeAccount=async()=>{
  await subscribeAccount({userId:userId,accountId:accountId})

}
  return (
    <button disabled={isLoading} onClick={onSubscribeAccount} className='px-2 py-1 bg-rose-500 hover:bg-rose-600 font-mono text-sm transition rounded-full duration-300'>{isLoading? "Loading":"subscribe"}</button>
  )
}

export default SubscriberAccount