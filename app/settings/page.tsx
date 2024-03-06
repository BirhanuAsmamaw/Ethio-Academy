

import Navbar from "@/components/navbar/Navbar";
import SettingsClient from "./settingsClient";

const SettingPage = () => {
  return ( <>
  <Navbar/>
  <div className="min-h-screen w-full flex justify-center items-center">
    <SettingsClient/>
  </div></> );
}
 
export default SettingPage;