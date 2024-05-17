"use client"
import { FieldValues,SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios"
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import Input from "@/components/input/input";
import ActionButton from '@/components/button/actionButton'
import CModal from '@/components/customModal'

import { MdEdit } from 'react-icons/md'


const AccountEdit = ({user}:{user:any}) => {

  const router=useRouter();
  const [Loading,setLoading]=useState(false);
  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues:{
     title:user?.teacher?.title,
     accountName:user?.teacher?.accountName,
     bankAccount:user?.teacher?.bankAccount,
     description:user?.teacher?.description,
    }

  })
  const onSubmit:SubmitHandler<FieldValues>=(data) => {

   
    setLoading(true)
    axios.put("/api/teacher/update/content",data).then((response) => {
      
      toast.success("Successfully updated");
  
    
       
    }).catch((error:any) => {
      toast.error(error.message)
    }).finally(()=>{
      setLoading(false)
      
    });
    
    
  }



 


if (!user || !user.teacher){
router.back()
return null;
}

  return (
    <CModal disabled={Loading} buttonLabel="Edit Account"  onClick={handleSubmit(onSubmit)} variant="ghost" className='p-0 hover:bg-transparent hover:dark:bg-transparent ' modalName={<ActionButton url='#' label='Account' icon={MdEdit}/>} title={"Edit Account"} >
<div className=" w-full p-2 flex justify-center md:max-w-2xl flex-col gap-2">

<div className="flex text-black dark:text-white flex-col gap-6">

<Input
    id="title"
    label="What is Your Teaching Title? (optional)" 
    type="text" 
    register={register}
    errors={errors}  
    defaultValue={user?.teacher?.title}
    placehoder="eg. Software Development,Nursing,Medicine, Business,Law..." 
   
     
  />  
  <Input
    id="accountName"
    label="Account Name (optional)" 
    type="text" 
    defaultValue={user?.teacher?.accountName}
    register={register}
    errors={errors} 
   
       
  />

<Input
    id="description"
    label="write some description about your Channel (optional)" 
    type="text" 
    register={register}
   defaultValue={user?.teacher?.description}
    errors={errors} 
   
  />


<Input
    id="bankAccount"
    label="Enter Your CBE Bank Account (optional)" 
    type="text" 
    defaultValue={user?.teacher?.bankAccount}
    register={register}
    errors={errors} 
   
   
  />
</div>



</div> 
    </CModal>
  )
}

export default AccountEdit