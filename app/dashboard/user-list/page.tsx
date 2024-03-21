import { getAllUsers } from "@/actions/users/getAllUsers";
import { UserListClient } from "./userListClient";





const UserList =async () => {

  const users=await getAllUsers();
  const usersData=users?.map(user =>{
    let users_no=0;
    let price=0;
   user.payedCourses.forEach((users:any)=>{
    users_no+=users.users.length;
    price+=users.totalPrice



    })
    return {...user, users:users_no,price:price}
  })
  return (<div className="px-4 py-10">
    <UserListClient users={usersData || null}/>
  </div>  );
}
 
export default UserList;