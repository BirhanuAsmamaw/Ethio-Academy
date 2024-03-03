
import { DeleteCourseById } from "@/actions/courses/deleteCoureById";
import DeleteComponent from "@/components/deleteComponent";

import toast from "react-hot-toast";

interface IParams{
  courseId: string;
}
const DeleteCourse = async({params}:{params:IParams}) => {
  
  const onDelete = async () => {

    try {
      await DeleteCourseById(params.courseId);
      toast.success(`Course deleted successfully`);
     
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete course. Please try again.");
    } finally {
   
    }
  };

  return (<DeleteComponent onDelete={onDelete} title="Delete this Course" label="Delete" />);
}
 
export default DeleteCourse;