"use client"
import Heading from '@/components/Heading/Heading'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import Input from '@/components/input/input'
import Button from '@/components/button/button'

interface UpdatebannerContentProps{
  banner: any;
}
const UpdatBannerContent:React.FC<UpdatebannerContentProps> = ({banner}) => {
  const router=useRouter()
  const [isLoading, setIsLoading]=useState(false)
  

  const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues: {
     
     title:banner.title,
      subtitle:banner.subtitle,
        
    },
  })
  







  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setIsLoading(true)
   
    
    axios.put(`/api/hero/${banner.id}/update/content`,{...data}).then(()=>{
      toast.success("banner updated successfully")
      router.refresh()
    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setIsLoading(false)
    });

  }
  return ( <div className="w-full p-2 bg-white shadow-md dark:bg-slate-800">
  <div className="p-4">
  <Heading small title="Update banner Content"/>
  </div>
<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 justify-between">
 
  <div className="pt-10 flex flex-col gap-4 justify-between px-4">
  

<div className=" flex-col items-center justify-center w-full ">

<Input id="title" 
defaultValue={banner.title}
register={register} errors={errors}  label="Hero Title" type="text" required/>


<Input id="subtitle" 
defaultValue={banner.subtitle}
register={register} errors={errors}  label="Hero Sub Title" type="text" required/>
</div>
  </div>
</div>
<div className="w-full flex justify-end  mt-6 py-6 px-4 ">
  <Button isDisabled={isLoading} title={isLoading?'Loading...':'Submit'} onClick={handleSubmit(onSubmit)}/>
</div>
</div>
  )
}

export default UpdatBannerContent;