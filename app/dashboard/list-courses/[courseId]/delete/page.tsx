import { DeleteCourseById } from "@/actions/courses/deleteCoureById";
import DeleteComponent from "@/components/deleteComponent";

interface IParams{
  courseId: string;
}
const DeleteCourse = async({params}:{params:IParams}) => {
//   const router=useRouter();
//   const [isLoading,setLoading]=useState(false);
//   const onDelete=()=>{
//     setLoading(true);
//  axios.delete(`/api/course/${params.courseId}/delete`).then(()=>{
//       toast.success(`Course deleted successfully`);
//       router.push(`/dashboard/list-courses`);
//       router.refresh();
//     }).catch((error)=>{
//       console.log(error);
//       toast.error(error.message);
//     }).finally(()=>{
//       setLoading(false);
//     });

  

const onDelete=async()=>{
  await DeleteCourseById(params.courseId)
  console.log(`Course deleted successfully`);
};



  return (<DeleteComponent 
  
    onDelete={onDelete} 
    title="Delete this Course"
    label="Delete" />);
}
 
export default DeleteCourse;