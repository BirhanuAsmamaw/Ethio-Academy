
"use client"

import { Cart } from "@/hooks/use.cart";
import { CourseType } from "@/types";
import { ReactNode, useEffect, useState } from "react";
interface CartProviderProps{
  children:ReactNode
}



const CARTS_KEY = "carts";
const TOTAL_PRICE_KEY = "totalPrice";

const CartProvider:React.FC<CartProviderProps> = ({children}) => {

  const [carts,setCarts]=useState<any[]|null>(null)
  const [totalPrice,setTotalPrice]=useState<number>(0)



  useEffect(() => {
    // Retrieve carts and totalPrice from local storage on component mount
    const storedCarts = localStorage.getItem(CARTS_KEY);
    const storedTotalPrice = localStorage.getItem(TOTAL_PRICE_KEY);

    if (storedCarts) {
      setCarts(JSON.parse(storedCarts));
    }

    if (storedTotalPrice) {
      setTotalPrice(parseFloat(storedTotalPrice));
    }
  }, []);



  useEffect(() => {
    // Save carts and totalPrice to local storage whenever they change
    localStorage.setItem(CARTS_KEY, JSON.stringify(carts));
    localStorage.setItem(TOTAL_PRICE_KEY, totalPrice.toString());
  }, [carts, totalPrice]);











  const addToCart = (data:CourseType)=>{
    if (!carts){
      setCarts([data]);
    }
else{
  const courseExists = carts.some((c) => c.id === data.id);
  if (courseExists){
    return "you already have added this course to cart";
  }
setCarts([...carts,data]);
}
    

   
    setTotalPrice((prevTotal) => prevTotal + data.price);


  }

  const removeFromCart = (courseId: string) => {
    if(!carts){
      return "There are no courses added to the cart";
    }
    
    const removedCart = carts.find((c) => c.id === courseId);
    if (removedCart) {
      const newCarts = carts.filter((c) => c.id !== courseId);
      setCarts(newCarts);
      setTotalPrice((prevTotal) => prevTotal - removedCart.price);
    }
  };

  const removeAllFromCart = () => {
   
      setCarts(null);
      setTotalPrice(0);
  };




  return <Cart.Provider value={{carts,totalPrice,addToCart,removeFromCart,removeAllFromCart}}>
{children}
  </Cart.Provider>;
}
 
export default CartProvider;