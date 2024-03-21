import { getAllUsers } from "@/actions/users/getAllUsers";
import { UserListClient } from "./userListClient";





const UserList =async () => {

  const users=await getAllUsers();
  const usersData=users?.map(user =>{
    let courses_no=0;
    let price=0;
   user.payedCourses?.forEach((c:any)=>{
    courses_no+=c.courses.length
    price+=c?.totalPrice



    })
    return {...user, courses:courses_no,price:price}
  })
  return (<div className="px-4 py-10">
    <UserListClient users={usersData || null}/>
  </div>  );
}
 
export default UserList;