import { getCurrentUser } from "@/actions/users/currentUser"
import AccountVerification from "@/components/account-verification"
import Navbar from "@/components/navbar/Navbar"
import Spinning from "@/components/spinning"
import { Suspense } from "react"


const AccountVerificationPage = async() => {

const user=getCurrentUser();
  return (<>
  <Navbar/>
  <Suspense fallback={<div 
    className="h-screen w-full flex justify-center items-center  gap-1 text-xl">
      <Spinning/>
      <p>Loading...</p>
    </div>}>
      <AccountVerification user={user}/>
      </Suspense></>
  )
}

export default AccountVerificationPage

