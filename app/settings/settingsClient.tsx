"use client"

import Input from "@/components/input/input";
import Spinning from "@/components/spinning";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FieldValues, RegisterOptions, UseFormRegisterReturn, useForm } from "react-hook-form";
import EditAccount from "./editAccount";
import EditPassword from "./editPassword";


interface SettingsClientProps{
  user:any;
}

const SettingsClient:React.FC<SettingsClientProps> = ({user}) => {



  if(!user){
    return <div className="w-full h-screen flex justify-center items-center">
      <Spinning/>
    </div>
  }



  


  return ( <Tabs defaultValue="account" className=" shadow-lg dark:shadow-black border dark:border-gray-700 rounded-[10px] min-w-[350px] max-w-[600px] bg-white dark:bg-gray-800">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>

  <TabsContent value="account">
    <EditAccount user={user}/>
  </TabsContent>



  <TabsContent value="password">
  <EditPassword/>
  </TabsContent>


</Tabs> );
}
 
export default SettingsClient;