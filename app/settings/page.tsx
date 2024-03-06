

import Navbar from "@/components/navbar/Navbar";
import SettingsClient from "./settingsClient";
import { getCurrentUser } from "@/actions/users/currentUser";

const SettingPage = async() => {
  const user=await getCurrentUser();
  return ( <>
  <Navbar/>
  <div className="min-h-screen w-full flex justify-center items-center">
    <SettingsClient user={user}/>
  </div></> );
}
 
export default SettingPage;