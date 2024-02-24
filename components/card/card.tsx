import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Container from "../container/container";




interface CardProps{
  id: string;
  subject: string;
  category: string;
  cover: any; // Assuming cover is the path to the image
  price: number;
  // users: string[]; // Assuming users are identified by strings
  // reviews: string[]; // Assuming reviews are identified by strings
  rating: number;
  // description: string;
}


const Card:React.FC<CardProps> = ({id,subject,category,cover,price,rating}) => {
  return ( <div className="w-full md:w-72 h-auto  bg-white dark:bg-gray-800 ">
  <Link href={`/course/${id}`} className="no-underline w-full ">
    <Image src={cover} alt={subject} height={200} width={200} 
    className=" w-full rounded-t-[5px]
     hover:scale-105
     transition 
     duration-300
     "/>
  </Link>
  <div className="flex flex-col p-3 gap-4">
    <div className="flex justify-between px-2">
      <Link href={`/category/${category}`} className=" no-underline bg-gray-200 dark:bg-gray-700 hover:text-blue-500 hover:underline transition py-1 px-2 cursor-pointer rounded-full items-center text-center text-sm">{category}</Link>
      <div  className="py-1 px-2   bg-teal-200 dark:bg-gray-700  rounded-full items-center text-center text-sm font-medium">{price}ETB</div>
    </div>
    <div className="flex justify-center">
      <h1 className="hidden md:block text-lg font-semibold p-1">{subject.length>21? subject.substring(0,19)+"...":subject}</h1>
      <h1 className=" md:hidden text-lg font-semibold p-1">{subject.length>30? subject.substring(0,30)+"...":subject}</h1>
    </div>
    <div className="flex justify-center"><Rating readOnly value={rating} size="small"/></div>

  </div>
  <div className="m-3">
  <Link href={`/course/${id}`} className="no-underline w-full flex justify-center border border-gray-200  dark:border-gray-600 hover:bg-opacity-70  rounded  duration-300 p-2">
    <p className="text-base font-medium ">Get started</p>
  </Link>
  </div>
</div>
 );
}
 
export default Card;