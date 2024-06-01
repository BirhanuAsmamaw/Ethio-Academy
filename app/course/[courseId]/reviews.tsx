import { Avatar, Rating } from "@mui/material";
import Moment from 'react-moment';
import Container from "@/components/container/container";
import Heading from "@/components/Heading/Heading";
import StarOutlined from "@mui/icons-material/StarOutlined";
type Review={
  customer:any;
  createdAt: string;
  comment: string;
  rating: number;

}

interface ReviewsProps{
  reviews: Review[];
}

const Reviews:React.FC<ReviewsProps> = ({reviews}) => {
  return (  <Container children={<div className="p-3">
    <Heading title="Reviews" />
    <div className="mt-4 " >{
    reviews.map((review,index)=> <div key={index} className="flex flex-col md:flex-row  w-full md:gap-4  border-b py-3 md:py-6 border-gray-200 dark:border-gray-600">
    <div className=""><Avatar alt={review.customer.name} src={review.customer.avatar}/></div>

    <div className="flex flex-col w-full py-2">
      <div className="flex flex-col  justify-between w-full">
        <div className="flex flex-col md:flex-row md:gap-6 justify-between"> 
        <p className="font-bold">{review.customer.name}</p>


        <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500 ">
<svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
<Moment fromNow>{review.createdAt}</Moment>
</span>
 
        </div>
        <div className="">
          <Rating 
        readOnly 
        value={review.rating} 
        precision={0.5} 
        size="small" 
        emptyIcon={
          <StarOutlined fontSize="inherit" className="text-gray-100 dark:text-gray-600" />
        }
        /></div>
  
      </div>
  
      <p className="text-sm text-gray-500 dark:text-gray-400  py-1">{review.comment}</p>
    </div>
    
  </div>)
  }</div>
</div>}/> );
}
 
export default Reviews;