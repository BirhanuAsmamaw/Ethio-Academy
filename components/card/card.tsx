import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";





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
  return (<>
  
  
  
  
  <div className="w-full
   
 
  
group
  border
   rounded-lg
    border-gray-200 

  dark:border-gray-700 
  bg-white dark:bg-gray-800 
   justify-center 
   items-center 
   hover:dark:border-x-yellow-400 
  hover:dark:border-y-green-400 
  hover:dark:bg-gray-700
  shadow 
   text-center
   transition duration-300

  ">

  <Link href={`/course/${id}`}   className="no-underline h-48 w-full overflow-hidden rounded-t-lg">
    <Image src={cover} alt={subject} height={200} width={200} className="w-full h-full group-hover:scale-105 transition duration-300"/>
  </Link>
  <div className="pb-4 mt-4 space-y-4">
    <div className="flex justify-between px-4">
    <Link href={`/category/${category}`} className="bg-gray-200 dark:bg-gray-700 hover:text-blue-500 no-underline hover:underline transition py-1 px-2 cursor-pointer rounded-full items-center text-center text-sm">{category}</Link>
       <p className=" text-green-400 font-semibold ">{price}ETB</p></div>

    <h1 className="text-lg font-semibold text-center w-full">{subject }</h1>

    <div className="flex justify-center"><Rating readOnly value={rating} size="small"/>
    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">4.95</p>
    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
    </div>


  </div>
 
  <div className="m-3">
  <Link href={`/course/${id}`} className="no-underline w-full flex justify-center border border-slate-400 hover:border-slate-400  rounded  duration-300 p-2">
    <p className="text-sm font-medium ">Get started</p>
  </Link>
  </div>
    
  </div></>
 );
}
 
export default Card;