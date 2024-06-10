
"use client"
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { useForm, FieldValues, SubmitHandler} from "react-hook-form";
import toast from "react-hot-toast";
import {signIn} from 'next-auth/react'


interface EditAccountProps{
  user:any;
}
const EditAccount:React.FC<EditAccountProps> = ({user}) => {
  const [isLoading,setloading] =useState(false);
  const router=useRouter();

  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
  
    defaultValues:{
      name:user.name,
      email:user.email,
   


        
    }})


    const onSubmit:SubmitHandler<FieldValues> =async (data) => {
      setloading(true);
     
      axios.put('/api/user/updateprofile', {...data}).then(() => {
        router.push("/dashboard/profile")
        router.refresh();
        toast.success("Your profile has been updated successfully")
      
        signIn('credentials',{
          email: data.email,
         
          redirect:false,
         }).then((callback)=>{
           if (callback?.ok){
            router.push("/dashboard/profile")
            router.refresh();
             
             toast.success("account logged in successfully")
             
           }
           if (callback?.error){
             toast.error(callback.error)
           }
         })  
      }).catch((error)=>{
        toast.error(error.message)
      }).finally(() => {
        setloading(false);
      });
     
      
    }

   
    
  return ( <div className="p-2 flex flex-col gap-4 w-full md:w-[400px] bg-white dark:bg-black">
  <h1 className="text-lg font-semibold">Edit Your Account</h1>
  <div className="p-2 space-y-3">

    <Input defaultValue={user.name} type="text" label="Edit Your Name" register={register} errors={errors} id="name"/>
    <Input defaultValue={user.email} type="email" label="Edit Your Email" register={register} errors={errors} id="email"/>
    <div className="p-6 flex justify-end">
      <Button isDisabled={isLoading} title={isLoading? "Loading...":"Submit"} onClick={handleSubmit(onSubmit)}/>
    </div>
  </div>
</div> );
}
 
export default EditAccount;