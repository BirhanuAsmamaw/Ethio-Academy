"use client"
import CModal from '@/components/customModal'
import Input from '@/components/input/input';
import { useUpdateProfileMutation } from '@/redux/features/user/userApi';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdModeEdit } from "react-icons/md";

const EditName = ({user}:{user:any}) => {
const router=useRouter();
  const [updateName,{isSuccess,isLoading}]=useUpdateProfileMutation()


  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
  
    defaultValues:{
      name:user?.name||""}})

      const onSubmit:SubmitHandler<FieldValues> =async (data) => {
        await updateName(data)
      }

      useEffect(()=>{
        if(isSuccess){
          router.push("/dashboard/profile")
          router.refresh()
          toast.success("updated your Name success!")

        }
      },[isSuccess])

  return (
    <CModal
    disabled={isLoading} 
    buttonLabel={isLoading?'Saving...':'Save'}
    onClick={handleSubmit(onSubmit)}
    className='bg-transparent p-0 hover:bg-transparent hover:text-black  hover:dark:text-white  text-gray-600 dark:text-gray-200 '
    modalName={<MdModeEdit size={20} className='text-gray-500 dark:text-gray-400'/>}    
    >

      <div className=" w-[300px] p-2  text-left">   
      <Input defaultValue={user?.name} type="text" label="Full Name" register={register} errors={errors} id="name"/></div>
    </CModal>
  )
}

export default EditName