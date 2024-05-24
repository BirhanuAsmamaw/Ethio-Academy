"use client"
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion"
import StarOutlined from "@mui/icons-material/StarOutlined";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ChannelVerfiedComponent from "../ChannelVerfiedComponent";
import { cn } from "@/lib/utils";




interface CardProps{
  id: string;
  subject: string;
  category?: string;
  subjectCat?: string;
  subjectCatId?:string;
  cover?: any; // Assuming cover is the path to the image
  price: number;
no_reviews?:number; // Assuming
  rating?: number;
  url?: string;
  instructorName?: string;
  instructorTitle?:string;
  logo?: any;
  instructorId?: string;
  className?:string;

  
}


const Card:React.FC<CardProps> = ({className,instructorId,subjectCatId,subjectCat,logo,instructorName,instructorTitle,id,subject,category,cover,price,rating,no_reviews,url}) => {

  const data="Express Js Course Object Oriented Programming in"
  return ( <AnimatePresence>
    <motion.div  
    initial={{opacity: 0,y:15}}
    whileInView={{opacity:1,y:0}} 
    transition={{delay:0.25,duration:0.5}}
    className={cn("group z-30  w-full sm:w-72 h-full bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800  rounded-[5px]hover:border-x-rose-500 hover:border-y-blue-500hover:bg-slate-50hover:dark:border-x-yellow-400 hover:dark:border-y-green-400 hover:dark:bg-gray-700 shadow overflow-hidden",className)}>
  <div   className="no-underline  relative overflow-hidden">
{subjectCat?    <div className="p-2 absolute bottom-0 -left-4 opacity-0 z-10   group-hover:left-0 bg-white dark:bg-gray-800 leading-5 group-hover:opacity-100 font-medium shadow-md drop-shadow-md text-gray-600 dark:text-green-400 bg-opacity-80 dark:bg-opacity-80 flex justify-center transition-all duration-300">
      <Link href={`/category/${url}/${subjectCatId}`} className=" 
      no-underline 
      hover:underline
       hover:text-blue-600 
        transition-all
         duration-300
       hover:dark:text-green-400

       text-gray-800
       dark:text-gray-300
       text-[12px] sm:text-[14px]">{subjectCat}</Link>
    </div>:""}
    {cover?<Image src={cover} alt={subject} 
    height={100}
    width={200}
    className=" w-full rounded-t-[5px]
    
     object-contain
     duration-300
     "/>:<div className="w-full items-center flex justify-center h-36 bg-blue-600">
      <h4 className=" text-left text-xl font-medium text-white">{subject} </h4>
      </div>}
  </div>
  <div className="flex flex-col pt-2 gap-1 sm:p-2 sm:gap-2 w-full">
    <div className="flex justify-between px-2">
      {category?<Link href={`/category/${url}`} className="  truncate no-underline md:bg-gray-200 md:dark:bg-gray-700 hover:text-blue-500 hover:underline transition sm:py-1 sm:px-2 cursor-pointer rounded-full items-center text-center text-[12px] sm:text-[14px] md:text-[16px]">{category}</Link>:""}

      <div  className="sm:py-1 sm:px-2   md:bg-emerald-100 md:dark:bg-gray-700  rounded-full items-center text-center text-[12px] sm:text-[18px] lining-nums  font-mono md:font-medium">{price? price +'ETB':'Free'}</div>
    </div>
    <div className="flex  h-[36px] sm:h-[48px]   items-center  justify-center flex-grow pt-1 sm:pt-4 w-full overflow-hidden  ">
      <h1 className=" w-full text-[14px] sm:text-lg  tracking-tight sm:!leading-tight text-center font-medium md:font-semibold p-1">{subject.length<=48? subject:subject.substring(0,45)+"..."} </h1>
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
      {rating?<p className="ms-1 text-[10px] sm:text-[12px] md:mt-[2px] truncate font-thin sm:font-normal text-gray-500 dark:text-gray-400">{no_reviews} reviews</p>:""}
   
    </div>

    {instructorName?<Link href={`/instructor/${instructorId}`} className="hover:underline no-underline transition px-1 md:px-0 sm:py-2 flex gap-1 md:gap-2">
      {logo?<Avatar className={`${!logo&&'hidden'} h-5 w-5 md:h-6 md:w-6  md:mt-1`}>
      <AvatarImage src={logo?logo:"/"} alt="image" />
      <AvatarFallback>{instructorName[0]}</AvatarFallback>
    </Avatar>:""}

      {instructorName?<div className="">
        <div className=" text-[12px] md:text-[14px]   text-gray-900 dark:text-gray-200  tracking-tight flex gap-2"><p className="  truncate">{instructorName}</p> <ChannelVerfiedComponent/></div>
  {instructorTitle?      <p className="text-gray-500 dark:text-gray-400 hidden sm:block text-xs  tracking-tight">{instructorTitle}</p>:""}
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