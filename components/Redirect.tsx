"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";



const Redirect = ({url}:{url?:string}) => {
  const router=useRouter();
  useEffect(()=>{
router.push(`${url? url:"/"}`)
  },[router])
  return null;
}
 
export default Redirect;