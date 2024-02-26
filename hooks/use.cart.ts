"use client"


import { CourseType } from "@/types";
import { createContext, useContext } from "react";


interface CartProps{
  carts: CourseType[]|null;
  totalPrice: number;
  addToCart:(data:CourseType) => void;
  removeAllFromCart:() => void;
  removeFromCart:(courseId:string) => void;
  
}


export const Cart=createContext<CartProps>({
  removeAllFromCart:() => {},
  carts: null,
  totalPrice:0,
  addToCart:()=>{},
  removeFromCart:()=>{}
});

export const useCart=()=>{
  return useContext(Cart)
}