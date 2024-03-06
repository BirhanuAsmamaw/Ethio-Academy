import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";




const SettingsClient = () => {
  return ( <Tabs defaultValue="account" className="w-[400px] bg-white dark:bg-gray-800">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-lg font-semibold">Edit Your Account</h1>
      <p>upload profile</p>
      <p>name</p>
      <p>email</p>
    </div>
  </TabsContent>



  <TabsContent value="password">
  <div className="flex flex-col gap-4 w-full">
      <h1 className="text-lg font-semibold">Edit Your Password</h1>
      <p>upload profile</p>
      <p>old Password</p>
      <p>new password</p>
    </div>
  </TabsContent>
</Tabs> );
}
 
export default SettingsClient;