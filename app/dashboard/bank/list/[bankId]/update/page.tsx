import React from 'react'
import UpdateBankContent from './content'
import UpdateBankFile from './file'
import { getBankById } from '@/actions/bank/getBankById'


const UpdateBank = async({params}:{params:{bankId:string}}) => {
  const bank=await getBankById(params.bankId)
  return (<div className="min-h-screen w-full flex justify-center items-center">

     <div className="w-full lg:w-11/12 xl:px-20 xl:8/12 flex flex-col gap-6 items-center">
      <UpdateBankContent bank={bank}/>
      <UpdateBankFile bank={bank}/>
     </div>
  </div>
  )
}

export default UpdateBank