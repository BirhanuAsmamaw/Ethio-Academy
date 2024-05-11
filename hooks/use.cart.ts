"use client"



import { createContext, useContext } from "react";


interface CartProps{
  carts: any[]|null;
  totalPrice: number;
  department: any|null;
  addToCart:(data:any) => void;
  addDepartment:(data:any) => void;
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