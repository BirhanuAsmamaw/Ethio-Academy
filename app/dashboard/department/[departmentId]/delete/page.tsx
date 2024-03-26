import { getDepartmentById } from "@/actions/departments/getDepartmentById";
import DeleteDepartmentClient from "./deleteDepartmentClient";

const DeleteDepartment =async ({params}:{params:{departmentId:string}}) => {
 const department=await getDepartmentById(params.departmentId);
 
  return (<DeleteDepartmentClient department={department}/>
  )
}

export default DeleteDepartment