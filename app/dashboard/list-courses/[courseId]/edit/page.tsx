interface IParams{
  courseId: string;
}

const EditCourse = ({params}:{params:IParams}) => {
  return ( <div className="pt-10 min-h-screen w-full">
    edit course id :{params.courseId}
  </div> );
}
 
export default EditCourse;