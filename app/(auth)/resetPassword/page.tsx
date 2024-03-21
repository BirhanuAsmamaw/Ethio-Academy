import Navbar from "@/components/navbar/Navbar"
import Spinning from "@/components/spinning"
import { Suspense } from "react"
import ResetPasswordClient from "./resetPasswordClient"


const ResetPassword = () => {


  return (<>
    <Navbar/>
    <Suspense fallback={<div 
      className="h-screen w-full flex justify-center items-center  gap-1 text-xl">
        <Spinning/>
        <p>Loading...</p>
      </div>}>
        <ResetPasswordClient/>
        </Suspense></>
    )
}

export default ResetPassword