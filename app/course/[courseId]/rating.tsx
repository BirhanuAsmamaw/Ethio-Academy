
import Container from "@/components/container/container";
import StarOutlined from "@mui/icons-material/StarOutlined";
import {  Rating } from "@mui/material";

 interface RatingPageProps{
  course:any;
 }
const RatingPage:React.FC<RatingPageProps> = ({course}) => {
  const stars=[
    0,1,2,3,4,5
    ]
  return (<Container childern={
    <div className="flex gap-10 flex-col md:flex-row justify-center ">
     {course.rating?<div className="flex flex-col justify-center gap-4 border-r border-gray-200 dark:border-gray-700  p-4 items-center">
        <h1 className="text-6xl font-bold text-center text-yellow-500">{course.rating}</h1>
        <Rating readOnly  value={course.rating} precision={0.5} 
        emptyIcon={
          <StarOutlined fontSize="inherit" className="text-gray-100 dark:text-gray-600" />
        }/>



      </div>:""}

      <div className="flex-col justify-center w-full p-6">
        {
          stars.map((star)=><div key={star} className="flex gap-4 w-full">
          <div className="flex gap-1 text-sm"><p>{star}</p><p>stars</p></div>

          <div className="h-2 w-[100%] bg-gray-200 dark:bg-gray-600 rounded-r-full overflow-hidden my-3">
            <div style={{ width: `${(star / 5) * 100}%` }}  className="h-2 rounded-lg bg-yellow-400"></div>
          </div>
           <p className="text-sm">{(star/5)*100}%</p>
        </div>)
        }


        
        
      </div>
    </div>

} />);
}
 
export default RatingPage;