import { getUserById } from "@/actions/tokens/getUserbyd"
import UpdateUserRoleClient from "./userRoleClient"
import { getAllPermission } from "@/actions/authorization/getAllPermission"
import { getAllRoles } from "@/actions/authorization/getAllRole"

const UpdateUserRole = async({params}:{params:{userId:string}}) => {
  const user = await getUserById(params.userId)
  // const filteredDataOne: { name: string }[] = dataOne.filter(item => !dataTwo.some(obj => obj.name === item.name));
 
 

const permissions = await getAllPermission()
const filteredPermissions = permissions?.filter(permission =>!user?.permissions.some(uerPermission=>uerPermission.permission.action===permission.action))

const roles= await getAllRoles()

const filteredRoles = roles?.filter(role =>!user?.roles.some(userRole=>userRole.role.name===role.name))

  return (<UpdateUserRoleClient user={user} permissions={filteredPermissions||null} roles={filteredRoles||null}/>)
  
}

export default UpdateUserRole