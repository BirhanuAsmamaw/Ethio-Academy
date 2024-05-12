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
    <div className="w-full h-full mt-16  md:mt-4 lg:mt-0 rounded-[10px] flex flex-col items-center justify-center  p-2  py-4 md:py-8 bg-gradient-to-r from-blue-600 from-40% via-blue-500 via-20% to-blue-600 to-40% ">
      
      <div className='w-full'>
    
    <div className=" w-full h-full  items-center flex gap-4  md:gap-x-20 flex-row">
    <Button 
        variant="ghost"
        className=' text-white  flex-shrink px-0 md:px-2  ' 
        onClick={()=>{router.push(backUrl||"/")}}>
         <MdOutlineKeyboardBackspace size={30} className='text-6xl font-bold'/> 
          </Button>
      <h1 className='w-full flex-grow drop-shadow-lg text-2xl tracking-tight !leading-tight md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-white font-semibold xl:font-extra-bold'>{title}</h1>

    </div>
    <div className="">{children}</div>
   
</div>

<div className='w-full flex justify-between px-4'>

 



  {isChange?<div className=" flex   flex-wrap gap-2 md:gap-4 justify-end ">

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