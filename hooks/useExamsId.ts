"use client"
import { createContext, useContext } from "react";
interface ToggleContextProps{
  examId: string;
  onSetExamId:(data:string) => void;
}
export const ExamsId=createContext<ToggleContextProps>({examId: "",onSetExamId:()=>{}});

export const useExamId=()=>{
  return useContext(ExamsId)
}