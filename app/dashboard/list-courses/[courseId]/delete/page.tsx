
interface IParams{
  courseId: string;
}
const DeleteCourse = ({params}:{params:IParams}) => {
  return ( <div className="pt-10 min-h-screen w-full">
    delete course id:{params.courseId}
  </div> );
}
 
export default DeleteCourse;