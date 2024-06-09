"use client"

import { useUserListsQuery } from "@/redux/features/user/userApi";
import { UserListClient } from "./userListClient";

const UserList = () => {

  const {data:users,isSuccess,error,isLoading,isError}=useUserListsQuery({page:"2",pageSize:"10"})



  if(isLoading){
    return <div className="w-full h-screen flex items-center justify-center px-4 py-10">
      <h1>Loading...</h1>
    </div>
  }

  if(isError){
    return <div className="w-full h-screen flex items-center justify-center px-4 py-10">
      <h1>Something Went Wrong!!</h1>
    </div>
  }



  return (<>{users&&users.users&&isSuccess?<div className="px-4 py-10">
    <UserListClient users={users?.users} pagination={users.pagination}/>
  </div>:""}</>  );
}
 
export default UserList;