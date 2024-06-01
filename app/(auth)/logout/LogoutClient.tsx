'use client'
import toast from 'react-hot-toast';
import {signOut} from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Container from '@/components/container/container';
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
      router.back();
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
  <Container className='p-4  sm:px-10 md:max-w-4xl lg:max-w-2xl'>
    <h5 className="text-[20px] font-normal text-gray-600 dark:text-gray-400  ">Are Sure To Logout ?</h5>


    <div className="w-full flex justify-end gap-4 p-6">
    <Button 
 variant="ghost"
onClick={onCancel}>
  Cancel
</Button>




    <Button 
 disabled={Loading}
 variant="ghost"
 className='text-rose-600'

onClick={onLogout}>
  {Loading? "Loading...":`Logout`}
</Button>


    </div>
  </Container>
</div> );
}
 
export default  LogoutClient ;