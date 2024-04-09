
import { getDepartmentById } from '@/actions/departments/getDepartmentById'
import AddSubjectClinet from './addSubjectClient'

const AddSubjectPage = async({params}:{params:{departmentId:string}}) => {
 const department=await getDepartmentById(params.departmentId)
  return (<div className=' h-screen w-screen flex justify-center items-center'>
    <AddSubjectClinet department={department}/>
  </div>)
}

export default AddSubjectPage