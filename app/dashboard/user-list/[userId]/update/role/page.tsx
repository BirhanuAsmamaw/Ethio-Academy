import { getUserById } from "@/actions/tokens/getUserbyd"
import UpdateUserRoleClient from "./userRoleClient"
import { getAllPermission } from "@/actions/authorization/getAllPermission"
import { getAllRoles } from "@/actions/authorization/getAllRole"

const UpdateUserRole = async({params}:{params:{userId:string}}) => {
  const user = await getUserById(params.userId)
 

const permissions = await getAllPermission()

const roles= await getAllRoles()
  return (<UpdateUserRoleClient user={user} permissions={permissions} roles={roles}/>)
  
}

export default UpdateUserRole