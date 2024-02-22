
import { getCurrentUser } from "@/actions/currentUser";
import NavbarClient from "./NavbarClient";

const Navbar =async () => {
  const currentUser = await getCurrentUser();
  return (<NavbarClient user={currentUser}/> );
}
 
export default Navbar;