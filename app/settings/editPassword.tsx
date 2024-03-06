
"use client"
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

const EditPassword= () => {

  const [isLoading,setloading] =useState(false);

  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
  
    defaultValues:{
      
      oldPassword:"",
      newPassword:""

        
    }})

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
      setloading(true);
      console.log(data);
      setloading(false);
    }

  return ( <div className="p-2 flex flex-col gap-4 w-full">
  <h1 className="text-lg font-semibold">Edit Your Password</h1>
  <div className="p-2 space-y-3">
    <Input type="password" label="Old Password" register={register} errors={errors} id="oldPassword"/>
    <Input type="password" label="New password" register={register} errors={errors} id="newPassword"/>
    <div className="p-6 flex justify-end">
      <Button isDisabled={isLoading} title={isLoading? "Loading...":"Submit"} onClick={handleSubmit(onSubmit)}/>
    </div>
  </div>
</div> );
}
 
export default EditPassword;