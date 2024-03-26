import { getUserById } from "@/actions/tokens/getUserbyd"
import UpdateUserRoleClient from "./userRoleClient"

const UpdateUserRole = async({params}:{params:{userId:string}}) => {
  const user = await getUserById(params.userId)


  return (<UpdateUserRoleClient user={user}/>)
  
}

export default UpdateUserRole