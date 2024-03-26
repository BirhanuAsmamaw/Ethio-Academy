"use client"
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";


interface DeleteComponentProps{
  isLoading?: boolean;
  onDelete:()=>void;
  title:string;
 
}
const DeleteComponent:React.FC<DeleteComponentProps> = ({isLoading,onDelete,title}) => {
const router=useRouter();
  const [value,setValue]=useState("")
 const [isValue,setisValue]=useState(false)

 useEffect(()=>{
  if(value==="delete my project"){
    setisValue(true)
  }
  else{
    setisValue(false)
  }
 },[value,setisValue])

 const onCancel=()=>{
  router.back();
 }
  return ( <div className="h-screen w-full flex justify-center items-center">
  <div className="mx-4 w-full md:max-w-md py-4 px-2 border bg-white border-gray-200 rounded-[10px] space-y-4 dark:bg-gray-800 dark:border-gray-700 ">
    <h5 className="text-[20px] font-normal text-rose-400 ">Are Sure To Delete this {title}?</h5>
<div className="space-y-1">
<label>To verify, type <span className="font-semibold text-rose-600 dark:text-red-400">delete my project</span> below:</label>
<Input onChange={(event)=>setValue(event.target.value)}/>
</div>

    <div className="w-full flex justify-end gap-4 p-6">
    <Button 
title={`Cancel`}
variant="destructive"
className="transition duration-300  text-rose-600 hover:text-rose-700  bg-red-300  hover:bg-rose-400 text-center " 
onClick={onCancel}/>




    <Button 
 disabled={isLoading || !isValue}
 variant="destructive"
title={isLoading? "Loading...":`Delete`}
className="transition duration-300 text-rose-600 hover:text-rose-700  bg-red-300  hover:bg-rose-400 text-center " 
onClick={onDelete}/>
    </div>
  </div>
</div> );
}
 
export default DeleteComponent;