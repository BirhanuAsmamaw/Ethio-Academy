import { getAllUsers } from "@/actions/users/getAllUsers";
import { UserListClient } from "./userListClient";





const UserList =async () => {

  const users=await getAllUsers();
  



  return (<div className="px-4 py-10">
    <UserListClient users={users|| null}/>
  </div>  );
}
 
export default UserList;