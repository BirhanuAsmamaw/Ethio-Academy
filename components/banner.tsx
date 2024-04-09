"use client"
import React, { ReactNode } from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { MdModeEdit} from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
interface Bannerprops{
  title:string;
  children:ReactNode
  isChange?:boolean;
  editUrl?:string;
  deleteUrl?:string;
  addUrl?:string;
  addName?:string;
  backUrl?:string;

}
const Banner:React.FC<Bannerprops> = ({title,backUrl,children,isChange,editUrl,deleteUrl,addName,addUrl}) => {
  const router=useRouter();
  return (
    <div className="w-full rounded-[10px] flex flex-col items-center justify-center  p-2   lg:py-10 bg-[url('../public/lightBanner.png')] dark:bg-[url('../public/darkBanner.png')] ">
      
      <div className='space-y-4'>
    
    <div className="flex  justify-center items-center ">
      <h1 className=' drop-shadow-lg text-xl md:text-2xl lg:text-4xl xl:text-6xl text-blue-700 
      dark:text-white font-bold xl:font-extra-bold'>{title}</h1>

    </div>
    <div className="">{children}</div>
   
</div>

<div className='w-full flex justify-between px-4'>

  <div className=" flex  gap-4 justify-end ">
  <Button 
        variant="outline" 
        className='bg-sky-600 hover:bg-sky-700 transition-all duration-300 text-white ' 
        onClick={()=>{router.push(backUrl||"/")}}>
         <MdOutlineKeyboardBackspace size={24}/> 
          </Button>
  </div>



  {isChange?<div className=" flex  gap-4 justify-end ">

<Button 
        variant="outline" 
        className='bg-green-600 hover:bg-green-700 transition-all duration-300 text-white flex gap-2' 
        onClick={()=>{router.push(addUrl||"/")}}>
         <IoMdAdd size={24}/> <p> {addName}</p>
          </Button>


        <Button 
        variant="outline" 
        className='bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white flex gap-2' 
        onClick={()=>{router.push(editUrl||"/")}}>
         <MdModeEdit size={24}/> <p> Edit</p>
          </Button>

        <Button 
        variant="outline" 
        className='bg-red-600 hover:bg-red-700 transition-all duration-300 text-white flex gap-2'
        onClick={()=>{router.push(deleteUrl||"/")}}>
          <MdDelete size={24}/> 
        <p> Delete</p> </Button>
      </div>:""}
      </div>
    </div>
  )
}

export default Banner