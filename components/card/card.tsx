import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import {motion} from "framer-motion"
import StarOutlined from "@mui/icons-material/StarOutlined";




interface CardProps{
  id: string;
  subject: string;
  category: string;
  cover: any; // Assuming cover is the path to the image
  price: number;
no_reviews?:number; // Assuming
  rating: number;
  url: string;
  
}


const Card:React.FC<CardProps> = ({id,subject,category,cover,price,rating,no_reviews,url}) => {
  return ( <motion.div  
    initial={{opacity: 0,translateX:-100}}
    whileInView={{opacity:1,translateX:0}} 
    transition={{delay:0.15,duration:0.25}}
    className="
  group
  z-30 
  w-full 
  md:w-72
   h-auto  
  bg-white border
   border-gray-200 
   dark:border-gray-700
   dark:bg-gray-800 
rounded-[5px]
   hover:dark:border-x-yellow-400 
   hover:dark:border-y-green-400 
   hover:dark:bg-gray-700
   shadow 
   
   ">
  <Link href={`/course/${id}`} className="no-underline  overflow-hidden">
    <Image src={cover} alt={subject} 
    height={100}
    width={200}
    className=" w-full rounded-t-[5px]
    
     object-contain
     duration-300
     "/>
  </Link>
  <div className="flex flex-col p-3 gap-4">
    <div className="flex justify-between px-2">
      <Link href={`/category/${url}`} className=" no-underline bg-gray-200 dark:bg-gray-700 hover:text-blue-500 hover:underline transition py-1 px-2 cursor-pointer rounded-full items-center text-center text-sm">{category}</Link>
      <div  className="py-1 px-2   bg-teal-200 dark:bg-gray-700  rounded-full items-center text-center text-sm font-medium">{price? price +'ETB':'Free'}</div>
    </div>
    <div className="flex justify-center">
      <h1 className="hidden md:block text-lg font-semibold p-1">{subject.length>21? subject.substring(0,19)+"...":subject}</h1>
      <h1 className=" md:hidden text-lg font-semibold p-1">{subject.length>30? subject.substring(0,30)+"...":subject}</h1>
    </div>
    {rating?<div className="flex justify-center">
      <Rating 
      precision={0.5} 
      readOnly value={rating} 
      size="small"
      emptyIcon={
        <StarOutlined fontSize="inherit" className="text-gray-100 dark:text-gray-600" />
      }
      />
      <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">{no_reviews} reviews</p>
   
    </div>:""}

  </div>
  <div className="m-3">
  <Link href={`/course/${id}`} className="no-underline w-full flex justify-center border border-gray-200  dark:border-gray-600 hover:bg-gray-200  hover:dark:bg-gray-600  rounded  duration-300 p-2">
    <p className="text-base font-medium ">Get started</p>
  </Link>
  </div>
</motion.div>
 );
}
 
export default Card;