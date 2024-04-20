"use client"


import Spinning from "@/components/spinning";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditAccount from "./editAccount";
import EditPassword from "./editPassword";
import CreateTeacher from "./createTeacher";


interface ProfileClientProps{
  user:any;
}

const ProfileClient:React.FC<ProfileClientProps> = ({user}) => {



  if(!user){
    return <div className="w-full  flex justify-center items-center">
      <Spinning/>
    </div>
  }



  


  return ( <Tabs defaultValue="account" className=" w-full ">
  <TabsList className=" flex flex-wrap w-full gap-4 p-2 ">
    <TabsTrigger className="rounded-full bg-slate-100 dark:bg-gray-800  data-[state=active]:text-white data-[state=active]:bg-[#4C6FFF]" value="account">Account</TabsTrigger>
    <TabsTrigger className="rounded-full bg-slate-100 dark:bg-gray-800  data-[state=active]:text-white data-[state=active]:bg-[#4C6FFF]"  value="password">Password</TabsTrigger>
    <TabsTrigger className="rounded-full bg-slate-100 dark:bg-gray-800 data-[state=active]:text-white data-[state=active]:bg-[#4C6FFF]"  value="teacherForm">Become A Teacher?</TabsTrigger>
  </TabsList>

  <TabsContent value="account" className="flex justify-center mt-6">
  <EditAccount user={user}/>
  </TabsContent>



  <TabsContent value="password" className="flex justify-center mt-6">
  <EditPassword user={user}/>
  </TabsContent>



  <TabsContent value="teacherForm" className="flex justify-center mt-6">
<CreateTeacher user={user}/>
  </TabsContent>

</Tabs> );
}
 
export default ProfileClient;