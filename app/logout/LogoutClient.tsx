'use client'
import toast from 'react-hot-toast';
import {signOut} from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import DeleteComponent from '@/components/deleteComponent';
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
  return (<DeleteComponent isLoading={Loading} onDelete={onLogout} title={'Logout'} label={'Logout'}/> );
}
 
export default  LogoutClient ;