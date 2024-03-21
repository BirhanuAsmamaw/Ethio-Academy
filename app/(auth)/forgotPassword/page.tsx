
import { getCurrentUser } from '@/actions/users/currentUser';
import ForgotPassword from '@/components/auth/forgotPassword'
import Navbar from '@/components/navbar/Navbar';
const ForgotPasswordPage = async() => {
  const user=await getCurrentUser();
 
  return (<><Navbar/>
  <ForgotPassword user={user}/>
  </>
  )
}

export default ForgotPasswordPage;