import AccountVerification from "@/components/account-verification"
import Navbar from "@/components/navbar/Navbar"
import Spinning from "@/components/spinning"
import { Suspense } from "react"


const AccountVerificationPage = () => {


  return (<>
  <Navbar/>
  <Suspense fallback={<div 
    className="h-screen w-full flex justify-center items-center  gap-1 text-xl">
      <Spinning/>
      <p>Loading...</p>
    </div>}>
      <AccountVerification/>
      </Suspense></>
  )
}

export default AccountVerificationPage

