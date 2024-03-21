import { getCurrentUser } from "@/actions/users/currentUser"
import ResetPasswordClient from "@/components/auth/resetPassword"
import Navbar from "@/components/navbar/Navbar"
import Spinning from "@/components/spinning"
import { Suspense } from "react"



const ResetPassword = async() => {

const user = await getCurrentUser();
  return (<>
    <Navbar/>
    <Suspense fallback={<div 
      className="h-screen w-full flex justify-center items-center  gap-1 text-xl">
        <Spinning/>
        <p>Loading...</p>
      </div>}>
        <ResetPasswordClient user={user}/>
        </Suspense></>
    )
}

export default ResetPassword