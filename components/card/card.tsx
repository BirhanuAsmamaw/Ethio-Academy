"use client"
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion"
import StarOutlined from "@mui/icons-material/StarOutlined";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ChannelVerfiedComponent from "../ChannelVerfiedComponent";




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
  instructorId?: string;

  
}


const Card:React.FC<CardProps> = ({instructorId,subjectCat,logo,instructorName,instructorTitle,id,subject,category,cover,price,rating,no_reviews,url}) => {
  return ( <AnimatePresence>
    <motion.div  
    initial={{opacity: 0,y:15}}
    whileInView={{opacity:1,y:0}} 
    transition={{delay:0.25,duration:0.5}}
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
hover:border-x-rose-500 
   hover:border-y-blue-500
   hover:bg-slate-50 
   hover:dark:border-x-yellow-400 
   hover:dark:border-y-green-400 
   hover:dark:bg-gray-700
   shadow 
   
   ">
  <Link href={`/course/${id}`} className="no-underline  relative overflow-hidden">
{subjectCat?    <div className="p-2 absolute bottom-0 -left-4 opacity-0 z-10   group-hover:left-0 bg-white dark:bg-gray-800 leading-5 group-hover:opacity-100 text-sm font-medium shadow-md drop-shadow-md text-gray-600 dark:text-green-400 bg-opacity-80 dark:bg-opacity-80 flex justify-center transition-all duration-300">
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
      <p className="ms-1 text-[10px] mt-[2px] font-thin text-gray-500 dark:text-gray-400">{no_reviews} reviews</p>
   
    </div>:""}

    {instructorName?<Link href={`/instructor/${instructorId}`} className="hover:underline no-underline transition py-2 flex gap-2">
      {logo?<Avatar className={`${!logo&&'hidden'} h-6 w-6  mt-1`}>
      <AvatarImage src={logo?logo:"/"} alt="image" />
      <AvatarFallback>{instructorName[0]}</AvatarFallback>
    </Avatar>:""}

      {instructorName?<div className="">
        <div className=" text-[14px] font-medium text-gray-900 dark:text-gray-200 leading-6 flex gap-2"><p>{instructorName}</p> <ChannelVerfiedComponent/></div>
  {instructorTitle?      <p className="text-gray-500 dark:text-gray-400 text-xs leading-3">{instructorTitle}</p>:""}
      </div>:""}
    </Link>:""}

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