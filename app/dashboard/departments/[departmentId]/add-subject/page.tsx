
import { getDepartmentById } from '@/actions/departments/getDepartmentById'
import AddSubjectClinet from './addSubjectClient'

const AddSubjectPage = async({params}:{params:{departmentId:string}}) => {
 const department=getDepartmentById(params.departmentId)
  return ( <AddSubjectClinet department={department}/>)
}

export default AddSubjectPage