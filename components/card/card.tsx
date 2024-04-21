"use client"
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion"
import StarOutlined from "@mui/icons-material/StarOutlined";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";




interface CardProps{
  id: string;
  subject: string;
  category: string;
  subjectCat?: string;
  cover: any; // Assuming cover is the path to the image
  price: number;
no_reviews?:number; // Assuming
  rating: number;
  url: string;
  instructorName?: string;
  instructorTitle?:string;
  logo?: any;

  
}


const Card:React.FC<CardProps> = ({subjectCat,logo,instructorName,instructorTitle,id,subject,category,cover,price,rating,no_reviews,url}) => {
  return ( <AnimatePresence>
    <motion.div  
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
  <Link href={`/course/${id}`} className="no-underline  relative overflow-hidden">
{subjectCat?    <div className="p-2 absolute top-1 left-0 bg-white dark:bg-gray-800 leading-5 text-sm font-medium shadow-md drop-shadow-md text-gray-600 dark:text-gray-400 bg-opacity-70 dark:bg-opacity-70 flex justify-center">
      <p>{subjectCat}</p>
    </div>:""}
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

    {instructorName?<div className="py-2 flex gap-2">
      {logo?<Avatar className={`${!logo&&'hidden'} h-6 w-6  mt-1`}>
      <AvatarImage src={logo?logo:"/"} alt="image" />
      <AvatarFallback>{instructorName[0]}</AvatarFallback>
    </Avatar>:""}

      {instructorName?<div className="">
        <p className=" text-[14px] font-medium leading-6">{instructorName}</p>
  {instructorTitle?      <p className="text-gray-500 dark:text-gray-400 text-xs leading-3">{instructorTitle}</p>:""}
      </div>:""}
    </div>:""}

  </div>

  <div className="m-3">
  <Link href={`/course/${id}`} className="no-underline w-full flex justify-center border border-gray-200  dark:border-gray-600 hover:bg-gray-200  hover:dark:bg-gray-600  rounded  duration-300 p-2">
    <p className="text-base font-medium ">Get started</p>
  </Link>
  </div>
</motion.div>
  </AnimatePresence>
 );
}
 
export default Card;