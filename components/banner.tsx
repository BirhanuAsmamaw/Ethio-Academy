"use client"
import React, { ReactNode } from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
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
    <div className="w-full rounded-[10px] flex flex-col items-center justify-center  p-2   lg:py-10 bg-[url('../public/lightBanner.png')] dark:bg-[url('../public/darkBanner.png')] ">
      {isChange?<div className="w-full flex  gap-4 justify-end px-4">
        <Button 
        variant="outline" 
        className='bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white flex gap-2' 
        onClick={()=>{router.push(editUrl||"/")}}>
         <MdModeEdit size={24}/> <p> Edit</p>
          </Button>

        <Button 
        variant="outline" 
        className='bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white flex gap-2'
        onClick={()=>{router.push(deleteUrl||"/")}}>
          <MdDelete size={24}/> 
        <p> Delete</p> </Button>
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