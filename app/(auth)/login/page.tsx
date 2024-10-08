
import { getCurrentUser } from "@/actions/users/currentUser";
import Login from "@/components/auth/login/login";
import Navbar from "@/components/navbar/Navbar";

const LoginPage = async() => {
  const user=await getCurrentUser();
  return (<> <Navbar/> <div className="flex py-10 min-h-screen w-full justify-center items-center">
    <Login user={user}/> 
  </div></>);
}
 
export default LoginPage;