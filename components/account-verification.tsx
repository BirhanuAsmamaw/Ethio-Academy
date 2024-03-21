"use client"
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";
interface  AccountVerificationProps{
    user:any;
}
const AccountVerification:React.FC<AccountVerificationProps> = ({user}) => {
    const router=useRouter()
    const searchparam=useSearchParams();
    const token=searchparam?.get("token");
    const onSubmit=useCallback(()=>{
        axios.post("/api/token/verification",{token}).then(()=>{
            toast.success("Account verified successfully")
            router.push("/login");
            router.refresh();

        }).catch((err)=>{
            toast.error("Account  does not verfied");
        });
    },[token,router])


    useEffect(()=>{onSubmit();},[onSubmit]);

    if (user){
        router.push('/')
        return null;
        }
  return ( 
    <div className="flex h-screen w-full justify-center items-center">
    <div className="m-2 border border-gray-200 dark:border-gray-600  rounded-[10px] bg-white dark:bg-gray-800 px-2 pt-4 pb-10 w-full md:max-w-md flex flex-col items-center gap-4">
      <p>{token}</p>
      <h1 className="font-semibold text-[16px]">Verify Your Account</h1>
      <div className="">
      <BeatLoader color="#36d7b7" />
      </div>
      </div>
  </div>
   );
}
 
export default AccountVerification;