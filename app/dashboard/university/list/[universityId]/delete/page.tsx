

import { getUniversityById } from "@/actions/university/getUniversityById";
import DeleteUniversityClient from "./deleteUniversityClient";


const DeleteUniversity =async ({params}:{params:{universityId:string}}) => {
 const University=await getUniversityById(params.universityId);
 
  return (<DeleteUniversityClient university={University}/>
  )
}

export default DeleteUniversity