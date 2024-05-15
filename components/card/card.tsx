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

  const data="Express Js Course Object Oriented Programming in"
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
 h-full
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
  <div className="flex flex-col pt-2 gap-1 md:p-2 md:gap-2 w-full">
    <div className="flex justify-between px-2">
      <Link href={`/category/${url}`} className=" no-underline md:bg-gray-200 md:dark:bg-gray-700 hover:text-blue-500 hover:underline transition md:py-1 md:px-2 cursor-pointer rounded-full items-center text-center text-[12px] md:text-sm">{category}</Link>
      <div  className="md:py-1 md:px-2   md:bg-emerald-100 md:dark:bg-gray-700  rounded-full items-center text-center text-sm font-medium">{price? price +'ETB':'Free'}</div>
    </div>
    <div className="flex  h-[40px] md:h-[48px]   items-center  justify-center flex-grow py-1 w-full overflow-hidden  ">
      <h1 className=" w-full text-[14px] md:text-lg  tracking-tight !leading-tight text-center font-medium md:font-semibold p-1">{subject.length<=48? subject:subject.substring(0,45)+"..."} </h1>
    </div>
    <div className="flex justify-center h-4 my-1 overflow-hidden ">
      {rating?<Rating 
      precision={0.5} 
      readOnly value={rating} 
      size="small"
      emptyIcon={
        <StarOutlined fontSize="inherit" className="text-gray-100 dark:text-gray-600" />
      }
      />:""}
      {rating?<p className="ms-1 text-[10px] md:mt-[2px] font-thin text-gray-500 dark:text-gray-400">{no_reviews} reviews</p>:""}
   
    </div>

    {instructorName?<Link href={`/instructor/${instructorId}`} className="hover:underline no-underline transition px-1 md:px-0 md:py-2 flex gap-1 md:gap-2">
      {logo?<Avatar className={`${!logo&&'hidden'} h-5 w-5 md:h-6 md:w-6  md:mt-1`}>
      <AvatarImage src={logo?logo:"/"} alt="image" />
      <AvatarFallback>{instructorName[0]}</AvatarFallback>
    </Avatar>:""}

      {instructorName?<div className="">
        <div className=" text-[12px] md:text-[14px]   text-gray-900 dark:text-gray-200  tracking-tight flex gap-2"><p>{instructorName}</p> <ChannelVerfiedComponent/></div>
  {instructorTitle?      <p className="text-gray-500 dark:text-gray-400 hidden md:block text-xs  tracking-tight">{instructorTitle}</p>:""}
      </div>:""}
    </Link>:""}

  </div>

  <div className="m-3">
  <Link href={`/course/${id}`} className="no-underline w-full flex justify-center border border-gray-200  dark:border-gray-600 hover:bg-gray-200  hover:dark:bg-gray-600  rounded  duration-300 p-2">
    <p className="text-sm md:text-base font-medium ">Get started</p>
  </Link>
  </div>
</motion.div>
  </AnimatePresence>
 );
}
 
export default Card;