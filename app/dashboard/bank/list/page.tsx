import React from 'react'
import { BankListClient } from './listClient'
import { getAllBanks } from '@/actions/bank/getAllBanks'

const BankList = async() => {
  const banks=await getAllBanks()
  return (<div className="min-h-screen w-full flex justify-center items-center">

    <BankListClient banks={banks}/>
  </div>
  )
}

export default BankList