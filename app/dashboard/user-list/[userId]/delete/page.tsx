import { getUserById } from "@/actions/tokens/getUserbyd";
import DeleteUserClientPage from "./deleteuserPage";

const DeleteUser=async({params}:{params:{userId:string}})=>{
  const user = await getUserById(params.userId);
  return (<DeleteUserClientPage user={user}/>)
}

export default DeleteUser;