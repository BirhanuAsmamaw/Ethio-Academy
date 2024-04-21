"use client"

import { FieldValues,SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios"
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import Input from "@/components/input/input";
import Button from "@/components/button/button";

interface CreateTeacherProps{
  user:any;
}
const CreateTeacher:React.FC<CreateTeacherProps> = ({user}) => {
const router=useRouter();
  const [Loading,setLoading]=useState(false);
  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues:{
     title:"",
     accountName:"",
     bankAccount:"",
     description:""
    }

  })
  const onSubmit:SubmitHandler<FieldValues>=(data) => {

   
    setLoading(true)
    axios.post("/api/teacher",data).then((response) => {
      
      toast.success("Successfully created");
  
    
       
    }).catch((error:any) => {
      toast.error(error.message)
    }).finally(()=>{
      setLoading(false)
      
    });
    
    
  }



 


if (!user){
router.back()
return null;
}

  return (
<div className="m-2 border border-gray-200 dark:border-gray-600  w-full p-2 flex justify-center bg-white shadow-md  dark:bg-black px-2 pt-4 pb-10  md:max-w-md flex-col gap-2">

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
    placehoder="eg. Software Developement,Nursing,..." 
   
     
  />  
  <Input
    id="accountName"
    label="Channel Name[optional]" 
    type="text" 
    register={register}
    errors={errors} 
   
       
  />

<Input
    id="description"
    label="write some description about your Channel [optional]" 
    type="text" 
    register={register}
   
    errors={errors} 
   
  />


<Input
    id="bankAccount"
    label="Enter Your CBE Bank Account [optional]" 
    type="text" 
    register={register}
    errors={errors} 
   
   
  />
</div>
<div className="mt-4 flex justify-end w-full">
<Button 
  isDisabled={Loading}
  title={Loading? "Loading...":"CreateTeacher"}
  className="transition duration-300  text-center " 
  onClick={handleSubmit(onSubmit)}/>
</div>


</div> 

  );
}
 
export default CreateTeacher;

