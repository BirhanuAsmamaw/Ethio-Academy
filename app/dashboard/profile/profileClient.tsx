"use client"


import Spinning from "@/components/spinning";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditAccount from "./editAccount";
import EditPassword from "./editPassword";


interface ProfileClientProps{
  user:any;
}

const ProfileClient:React.FC<ProfileClientProps> = ({user}) => {



  if(!user){
    return <div className="w-full h-screen flex justify-center items-center">
      <Spinning/>
    </div>
  }



  


  return ( <Tabs defaultValue="account" className=" shadow-lg dark:shadow-black border dark:border-gray-700 rounded-[10px] w-full ">
  <TabsList className="grid w-full grid-cols-2 gap-4 bg-white dark:bg-black p-2 ">
    <TabsTrigger className="rounded-full" value="account">Account</TabsTrigger>
    <TabsTrigger className="rounded-full"  value="password">Password</TabsTrigger>
  </TabsList>

  <TabsContent value="account" className="flex justify-center">
  <EditAccount user={user}/>
  </TabsContent>



  <TabsContent value="password" className="flex justify-center">
  <EditPassword user={user}/>
  </TabsContent>


</Tabs> );
}
 
export default ProfileClient;