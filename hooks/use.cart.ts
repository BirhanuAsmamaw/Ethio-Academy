"use client"


import { CourseType } from "@/types";
import { createContext, useContext } from "react";


interface CartProps{
  carts: CourseType[]|null;
  totalPrice: number;
  department: any|null;
  addToCart:(data:CourseType) => void;
  addDepartment:(data:CourseType) => void;
  removeAllFromCart:() => void;
  removeFromCart:(courseId:string) => void;
  
}


export const Cart=createContext<CartProps>({
  removeAllFromCart:() => {},
  carts: null,
  department: null,
  addDepartment: () => {},
  totalPrice:0,
  addToCart:()=>{},
  removeFromCart:()=>{}
});

export const useCart=()=>{
  return useContext(Cart)
}