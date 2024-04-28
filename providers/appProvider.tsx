"use client"

import React from 'react'
import { Provider } from 'react-redux'
import { ReactNode } from "react";
import { ToggleProvider } from "./toggleProvider";
import { ThemeProvider } from "./themeProvider";
import CartProvider from "./cartProvider";
import { ExamsIdProvider } from "./examsIdProvider";
import { store } from '@/redux/store';


interface AppProviderProps{
  children:ReactNode;
}
const AppProvider:React.FC<AppProviderProps> = ({children}) => {
  return (  <Provider store={store}>
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  ><ToggleProvider>
   <CartProvider>
 <ExamsIdProvider> {children}</ExamsIdProvider>
   </CartProvider>
  </ToggleProvider> </ThemeProvider>
  </Provider>);
}
 
export default AppProvider;