"use client"


import Spinning from "@/components/spinning";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditAccount from "./editAccount";
import EditPassword from "./editPassword";
import CreateTeacher from "./createTeacher";
import UpdateTeacherLogo from "./updateTeacherLogo";
import UpdateTeacherContent from "./updateTeacherContent";


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
    <TabsTrigger className="
           border-b-[1.5px]  
           font-normal
            border-slate-400 
           bg-transparent 
           shadow-none
           hover:dark:text-white
           hover:text-gray-900
           hover:font-medium
           hover:dark:border-gray-100
            transition
              duration-300
           hover:border-gray-800
           data-[state=active]:border-blue-500
           data-[state=active]:dark:border-green-400
           data-[state=active]:border-b-2
           data-[state=active]:font-medium
           data-[state=active]:text-blue-500
           data-[state=active]:dark:text-green-400

           " value="account">Account</TabsTrigger>
    <TabsTrigger className="
           border-b-[1.5px]  
           font-normal
            border-slate-400 
           bg-transparent 
           shadow-none
           hover:dark:text-white
           hover:text-gray-900
           hover:font-medium
           hover:dark:border-gray-100
            transition
              duration-300
           hover:border-gray-800
           data-[state=active]:border-blue-500
           data-[state=active]:dark:border-green-400
           data-[state=active]:border-b-2
           data-[state=active]:font-medium
           data-[state=active]:text-blue-500
           data-[state=active]:dark:text-green-400

           "  value="password">Password</TabsTrigger>
    <TabsTrigger className="
           border-b-[1.5px]  
           font-normal
            border-slate-400 
           bg-transparent 
           shadow-none
           hover:dark:text-white
           hover:text-gray-900
           hover:font-medium
           hover:dark:border-gray-100
            transition
              duration-300
           hover:border-gray-800
           data-[state=active]:border-blue-500
           data-[state=active]:dark:border-green-400
           data-[state=active]:border-b-2
           data-[state=active]:font-medium
           data-[state=active]:text-blue-500
           data-[state=active]:dark:text-green-400

           "  value="teacherForm">Become A Teacher?</TabsTrigger>
  </TabsList>

  <TabsContent value="account" className="flex justify-center mt-6">
  <EditAccount user={user}/>
  </TabsContent>



  <TabsContent value="password" className="flex justify-center mt-6">
  <EditPassword user={user}/>
  </TabsContent>



  <TabsContent value="teacherForm" className="flex justify-center mt-6">
{user?.teacher? <div className="flex gap-6">
  <UpdateTeacherLogo user={user}/>
  <UpdateTeacherContent user={user}/>

</div>:<CreateTeacher user={user}/>}
  </TabsContent>

</Tabs> );
}
 
export default ProfileClient;