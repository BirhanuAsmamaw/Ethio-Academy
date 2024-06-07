"use client"


import CModal from "@/components/customModal"
import TextEditor from "@/components/editor/editor"
import axios from "axios"
import { useRouter } from "next/navigation"
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { MdModeEditOutline } from "react-icons/md";
import { RiSubtractFill } from "react-icons/ri"
interface UpdateContentProps{
  content:any
  isAdd?:boolean
}
 const UpdateContent:React.FC<UpdateContentProps>=({isAdd,content})=> {
  const [description, setDescription]=useState<string|null>(null)
const [isLoading,setIsLoading]=useState(false)
const [code,setCode]=useState(content?.codeExample?content?.codeExample?.code:"")
  const [language,setLanguage]=useState(content?.codeExample? content?.codeExample?.language:"")

  const [isCode,setIsCode]=useState(content?.codeExample?true:false)
  const [isContent,setIsContent]=useState(content?.content?true:false)

const router=useRouter();
  const {handleSubmit,setValue,reset}=useForm<FieldValues>({
    defaultValues: {
     content:description||content?.content,
    

      
      }})


      const codeExample=code&&language?{
        code:code,
        language:language
      }:null;

useEffect(()=>{
  setValue("content",description||content?.content)
  setValue("codeExample",codeExample||content?.codeExample)
},[description,codeExample])



console.log("content:",content)
      const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
        setIsLoading(true)
       
    console.log("update content data",data)
   
        axios.put(`/api/content/${content?.id}/update/content`,data).then(()=>{
        
          router.refresh()
          reset()
          toast.success("Content updated successfully")
          console.log("update content data",data)
        })
        .catch((error)=>{
         
          toast.error(error.message)
        
        }).finally(()=>{
          setIsLoading(false)
        });
    
      }

      
  return (<CModal 
    variant="secondary"
title={`${isAdd?"Add":"Update"} Content`}
disabled={isLoading}
buttonLabel={isLoading? "Updating...":"Update"}
onClick={handleSubmit(onSubmit)}
className=" rounded-none
   p-2"
modalName={isAdd?<IoMdAdd 
  className='text-gray-600
  
  dark:text-gray-400
  hover:text-gray-900
   hover:dark:text-gray-100 transition'
size={18}/>:<MdModeEditOutline
className='text-gray-600
dark:text-gray-400
hover:text-gray-900
 hover:dark:text-gray-100 transition'
 size={24}/>}>
<div className="py-4   w-full">
{isContent?<TextEditor  value={description? description:content?.content} setValue={setDescription}/>:""}


{/* // CODE editor */}

{isCode?<div className="md:p-4 mt-4 space-y-6 text-left w-full flex flex-col">

<input defaultValue={content?.codeExample.language||""} type="text" onChange={(event)=>setLanguage(event?.target.value)} className='border  outline-none border-slate-400 hover:border-blue-500 focus:border-blue-500 focus:dark:border-green-400  hover:dark:border-green-400 dark:border-gray-500   p-2 w-full  bg-slate-50 rounded-md dark:bg-gray-800' placeholder='add programming language'/>

<textarea
onChange={(event)=>setCode(event?.target.value)} 
rows={6}
defaultValue={content?.codeExample.code||""}

 className='w-full  p-2 outline-none bg-slate-50 rounded-md dark:bg-gray-800 border border-slate-400 dark:border-gray-500  hover:border-blue-500 focus:border-blue-500 focus:dark:border-green-400  hover:dark:border-green-400' placeholder='write code examples...'/>

</div>:""}

<div className="p-4 flex justify-end w-full gap-4 items-center">
{!content?.codeExample?<button
     onClick={()=>{
      setCode("")
      setLanguage("")
      setIsCode((prev)=>!prev)
     }}
    className="py-1 md:py-2 px-3 md:px-5 me-2 mb-2
text-sm font-medium text-gray-900 focus:outline-none
 bg-white rounded-full border border-gray-200 
 hover:bg-gray-100 hover:text-blue-700 focus:z-10 
 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700
  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
   dark:hover:text-white dark:hover:bg-gray-700 flex gap-2 items-center justify-center">
    {isCode? <RiSubtractFill size={24}/>:<IoMdAdd size={24}/>} <p>Code</p></button> :""}

    {!content?.content?<button
     onClick={()=>{
      setDescription("")
      setIsContent((prev)=>!prev)
     }}
    className="py-1 md:py-2 px-3 md:px-5 me-2 mb-2
text-sm font-medium text-gray-900 focus:outline-none
 bg-white rounded-full border border-gray-200 
 hover:bg-gray-100 hover:text-blue-700 focus:z-10 
 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700
  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
   dark:hover:text-white dark:hover:bg-gray-700 flex gap-2 items-center justify-center">
    {isContent? <RiSubtractFill size={24}/>:<IoMdAdd size={24}/>} <p>Content</p></button>:""}
</div>
</div>
</CModal>
    
  )
}

export default UpdateContent;
