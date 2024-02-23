interface IParams{
  courseId: string;
}

const Chapter = ({params}:{params:IParams}) => {
  return ( <div className="pt-10 min-h-screen w-full">Chapter list of course id:{params.courseId}</div> );
}
 
export default Chapter;