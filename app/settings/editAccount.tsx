
"use client"
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
interface EditAccountProps{
  user:any;
}
const EditAccount:React.FC<EditAccountProps> = ({user}) => {
  const [isLoading,setloading] =useState(false);
  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
  
    defaultValues:{
      image:user?.image||null,
      name:user?.name,
      email:user?.email

        
    }})

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
      setloading(true);
      console.log(data);
      setloading(false);
    }
    
  return ( <div className="p-2 shadow-lg dark:shadow-black border dark:border-gray-700 rounded-[10px] flex flex-col gap-4 w-full">
  <h1 className="text-lg font-semibold">Edit Your Account</h1>
  <div className="p-2 space-y-3">
    <Input type="text" label="Edit Your Name" register={register} errors={errors} id="name"/>
    <Input type="email" label="Edit Your Email" register={register} errors={errors} id="email"/>
    <div className="p-6 flex justify-end">
      <Button isDisabled={isLoading} title={isLoading? "Loading...":"Submit"} onClick={handleSubmit(onSubmit)}/>
    </div>
  </div>
</div> );
}
 
export default EditAccount;