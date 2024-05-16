"use client"

import { Button } from '@/components/ui/button';
import { useSubscribeAccountMutation } from '@/redux/features/subscribers/subscriberApi';
import { useRouter } from 'next/navigation';
import React from 'react'

const SubscriberAccount = ({userId,accountId,is_subscriber}:{userId:string,accountId:string,is_subscriber:boolean}) => {


  const [subscribeAccount,{data,isLoading}]=useSubscribeAccountMutation();
  const router=useRouter();

const onSubscribeAccount=()=>{
  subscribeAccount({userId:userId,accountId:accountId})
  router.push(`/instructor/${accountId}`)
  router.refresh();


}


  return (<Button disabled={isLoading} onClick={onSubscribeAccount} className={`
 
   text-gray-100
   hover:text-white
    
  font-mono 
  text-sm transition 
  rounded-full duration-300
  ${is_subscriber?'bg-slate-600 hover:bg-slate-700':'bg-rose-500 hover:bg-rose-600 '}
  `}>
    {isLoading? "Loading...":`${is_subscriber?"unsubscribe":"subscribe"}`}</Button>
    
  )
}

export default SubscriberAccount