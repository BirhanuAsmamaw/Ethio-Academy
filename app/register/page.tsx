
import { getCurrentUser } from "@/actions/users/currentUser";
import Navbar from "@/components/navbar/Navbar";
import Signup from "@/components/signup/signup";

const RegisterPage = async() => {
  const user=await getCurrentUser();
  return ( <> <Navbar/><div className="flex h-screen w-full justify-center items-center">
  <Signup user={user}/> 
</div> </>);
}
 
export default RegisterPage;