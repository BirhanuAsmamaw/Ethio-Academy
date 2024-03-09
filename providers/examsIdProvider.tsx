"use client"
import { ExamsId } from "@/hooks/useExamsId";
import { ReactNode, useState } from "react"
interface ToggleProviderProps{
  children:ReactNode;
}
export const ExamsIdProvider:React.FC<ToggleProviderProps>=({children})=>{

const [examId,setExamId]=useState("")
   const onSetExamId=(data:string)=>{
    setExamId(data);
   }

  return <ExamsId.Provider value={{examId,onSetExamId}}>
{children}
  </ExamsId.Provider>
}