"use client"
import React, { ReactNode } from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
interface Bannerprops{
  title:string;
  children:ReactNode
  isChange?:boolean;
  editUrl?:string;
  deleteUrl?:string;

}
const Banner:React.FC<Bannerprops> = ({title,children,isChange,editUrl,deleteUrl}) => {
  const router=useRouter();
  return (
    <div className="w-full rounded-[10px] flex justify-center  p-2   lg:py-10 bg-[url('../public/lightBanner.png')] dark:bg-[url('../public/darkBanner.png')] ">
      {isChange?<div className="w-full flex  justify-end px-4">
        <Button variant="outline" onClick={()=>{router.push(editUrl||"/")}}>Edit</Button>
        <Button variant="outline" onClick={()=>{router.push(deleteUrl||"/")}}>Delete </Button>
      </div>:""}
      <div className='space-y-4'>
    
    <div className="flex  justify-center items-center ">
      <h1 className=' drop-shadow-lg text-xl md:text-2xl lg:text-4xl xl:text-6xl text-blue-700 
      dark:text-white font-bold xl:font-extra-bold'>{title}</h1>

    </div>
    <div className="">{children}</div>
   
</div>
    </div>
  )
}

export default Banner