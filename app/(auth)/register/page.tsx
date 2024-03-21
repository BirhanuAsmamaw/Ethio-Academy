
import { getCurrentUser } from "@/actions/users/currentUser";
import Signup from "@/components/auth/signup/signup";
import Navbar from "@/components/navbar/Navbar";


const RegisterPage = async() => {
  const user=await getCurrentUser();
  return ( <> <Navbar/><div className="flex h-screen w-full justify-center items-center">
  <Signup user={user}/> 
</div> </>);
}
 
export default RegisterPage;