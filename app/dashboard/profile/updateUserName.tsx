"use client"
import CModal from '@/components/customModal'
import Input from '@/components/input/input'
import { useUpdateUsernameMutation } from '@/redux/features/user/userApi'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoIosAdd } from "react-icons/io";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { MdOutlineChangeCircle } from 'react-icons/md'

const UpdateUserNameClient = ({user}:{user:any}) => {
  const router=useRouter();
  const [updateUserName,{isSuccess,isError,data,error,isLoading}]=useUpdateUsernameMutation()

  console.log("user data",data)
  console.log("error",error)


  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
  
    defaultValues:{
      username:user?.username}})

      const onSubmit:SubmitHandler<FieldValues> =async (data) => {
        await updateUserName(data)
      }

      const errorMessage =isError&&(error as any)?.data?.message || "An error occurred"
  return (<CModal
    disabled={isLoading} 
    buttonLabel={isLoading?'Updating...':'Update'}
    onClick={handleSubmit(onSubmit)}
    className='bg-transparent p-0 hover:bg-transparent hover:text-black  hover:dark:text-white  text-gray-600 dark:text-gray-200 '
    modalName={user?.username?<MdOutlineChangeCircle className='text-gray-500 dark:text-gray-400'/>:<button type="button" className=" rounded-full  text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 px-1  py-0.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex items-center"> <IoIosAdd size={15}/> <span className='  font-sans text-[10px]'>Username</span></button>}    
    >

      <div className=" w-[300px] p-2  text-left">   
      <Input defaultValue={user?.username} className={`${isError&&'border-rose-400 text-rose-500 dark:border-rose-600'}`}  type="text" label="Username" register={register} errors={errors} id="username"/>

       {isError?<p className='text-sm  text-red-500'>{errorMessage}</p>:""}
    
      
      <div className="mt-4 text-gray-500 text-xs font-light dark:text-gray-500 ">
        <p>You can use letters from 'a' to 'z', numbers from '0' to '9', underscores.</p>
        <p>Minimum length of 4 characters</p>
      </div>
      </div>
    </CModal>
  )
}

export default UpdateUserNameClient