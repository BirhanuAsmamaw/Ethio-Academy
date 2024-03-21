"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'
import {BeatLoader} from "react-spinners"

const AccountVerificationPage = () => {
  const searchParams=useSearchParams();
  const token=searchParams?.get('token');

  return (<div className="flex h-screen w-full justify-center items-center">
    <div className="m-2 border border-gray-200 dark:border-gray-600  rounded-[10px] bg-white dark:bg-gray-800 px-2 pt-4 pb-10 w-full md:max-w-md flex flex-col items-center gap-4">
      <p>{token}</p>
      <h1 className="font-semibold text-[16px]">Verify Your Account</h1>
      <div className="">
      <BeatLoader color="#36d7b7" />
      </div>
      </div>
  </div>
  )
}

export default AccountVerificationPage