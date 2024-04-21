"use client"

import { FieldValues,SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios"
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import Input from "@/components/input/input";
import Button from "@/components/button/button";

interface UpdateTeacherContentProps{
  user:any;
}
const UpdateTeacherContent:React.FC<UpdateTeacherContentProps> = ({user}) => {
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
<div className="m-2 border border-gray-200 dark:border-gray-600  rounded-[10px] bg-white dark:bg-black px-2 pt-4 pb-10 w-full md:max-w-md flex flex-col gap-2">

<div className="flex flex-col gap-6">
<div className="py-4">
    <h1 className="font-semibold text-[16px]">Become A Teacher?</h1>
  </div>
<Input
    id="title"
    label="What is Your Teaching Title? [optional]" 
    type="text" 
    register={register}
    errors={errors}  
    defaultValue={user?.teacher?.title}
    placehoder="eg. Software Developement,Nursing,..." 
   
     
  />  
  <Input
    id="accountName"
    label="Channel Name[optional]" 
    type="text" 
    defaultValue={user?.teacher?.accountName}
    register={register}
    errors={errors} 
   
       
  />

<Input
    id="description"
    label="write some description about your Channel [optional]" 
    type="text" 
    register={register}
   defaultValue={user?.teacher?.description}
    errors={errors} 
   
  />


<Input
    id="bankAccount"
    label="Enter Your CBE Bank Account [optional]" 
    type="text" 
    defaultValue={user?.teacher?.bankAccount}
    register={register}
    errors={errors} 
   
   
  />
</div>
<div className="mt-4 flex justify-end w-full">
<Button 
  isDisabled={Loading}
  title={Loading? "Loading...":"Update"}
  className="transition duration-300  text-center " 
  onClick={handleSubmit(onSubmit)}/>
</div>


</div> 

  );
}
 
export default UpdateTeacherContent;

