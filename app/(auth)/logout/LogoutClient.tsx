'use client'
import toast from 'react-hot-toast';
import {signOut} from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import DeleteComponent from '@/components/deleteComponent';
import { Button } from '@/components/ui/button';
interface LogoutClientProps{
  user:any;
}
const LogoutClient:React.FC<LogoutClientProps> = ({user}) => {
  const router=useRouter();
  const [Loading,setLoading]=useState(false);
    useEffect(()=>{

      if (!user) {

        router.push('/')
      }
    },[user]);
    
  

  
 
  const onLogout =()=>{
    setLoading(true);
    signOut().then(()=>{
      router.push('/');
    router.refresh();
    toast.success("Your Account Logout Successfully!");
    })
    .catch(()=>{
      toast.error("Error occured in logout!");
    }).
    finally(()=>{
      setLoading(false);
    });
    
  
    
  }


  const onCancel = () => {
    router.back();
  };
  return (<div className="h-screen w-full flex justify-center items-center">
  <div className="mx-4 w-full md:max-w-md py-4 px-2 border bg-white border-gray-200 rounded-[10px] space-y-4 dark:bg-gray-800 dark:border-gray-700 ">
    <h5 className="text-[20px] font-normal text-rose-400 ">Are Sure To Logout ?</h5>


    <div className="w-full flex justify-end gap-4 p-6">
    <Button 
title={`Cancel`}
variant="destructive"
className="transition duration-300  text-rose-600 hover:text-rose-700  bg-red-300  hover:bg-rose-400 text-center " 
onClick={onCancel}/>




    <Button 
 disabled={Loading}
 variant="destructive"
title={Loading? "Loading...":`Delete`}
className="transition duration-300 text-rose-600 hover:text-rose-700  bg-red-300  hover:bg-rose-400 text-center " 
onClick={onLogout}/>
    </div>
  </div>
</div> );
}
 
export default  LogoutClient ;