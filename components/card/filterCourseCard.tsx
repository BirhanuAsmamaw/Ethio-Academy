"use client"
import { Rating } from "@mui/material";
import StarOutlined from "@mui/icons-material/StarOutlined";
import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import ChannelVerfiedComponent from '../ChannelVerfiedComponent';
import Link from "next/link";


interface FilterCardProps{
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
  
const FilterCourseCard:React.FC<FilterCardProps> = ({instructorId,subjectCat,logo,instructorName,instructorTitle,id,subject,category,cover,price,rating,no_reviews,url}) => {
  return (
   <Link href={`/course/${id}`}  className="grid 
   grid-cols-1 md:grid-cols-3
    no-underline
    text-gray-800
     
    dark:text-gray-200

    w-full 
    hover:shadow
     dark:border-gray-700
    hover:dark:shadow
    hover:dark:shadow-green-400
    hover:dark:border-green-400
     hover:shadow-blue-400 
     gap-6 m-4
     dark:bg-slate-800
      hover:dark:bg-gray-700
      bg-slate-50
      hover:bg-slate-100
      hover:border-blue-500   
      border border-slate-300
      rounded-[10px]
       transition-all
     ">

    {/* image */}
    <div className=" md:col-span-1 overflow-hidden">
        <Image 
        className=' h-full w-full object-contain'
        height={200}
        width={500}
        src={cover}
         alt={subject} 
        />
    </div>


    {/* Contents */}
    <div className=" space-y-2 md:col-span-2 pt-2 px-2">
    <div className=" flex justify-between ">
    <h1 className=" text-xl font-semibold leading-10 ">{subject}</h1>
    <div  className="py-1 px-2 text-blue-600 dark:text-green-400   items-center text-center text-sm font-medium">{price? price +'ETB':'Free'}</div>
    </div>
    <div className="">
    <p className='text-base leading-6 font-medium'>{subjectCat}</p>
    <p className='text-sm  leading-4 text-gray-500'>{category}</p>
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



    {instructorName?<div className="flex justify-end w-full pt-2">
  <div className=" transition py-2 flex gap-2">
      {logo?<Avatar className={`${!logo&&'hidden'} h-6 w-6  mt-1`}>
      <AvatarImage src={logo?logo:"/"} alt="image" />
      <AvatarFallback>{instructorName[0]}</AvatarFallback>
    </Avatar>:""}

      {instructorName?<div className="">
        <div className=" text-[14px] font-medium text-gray-900 dark:text-gray-200 leading-6 flex gap-2"><p>{instructorName}</p> <ChannelVerfiedComponent/></div>
  {instructorTitle?      <p className="text-gray-500 dark:text-gray-400 text-xs leading-3">{instructorTitle}</p>:""}
      </div>:""}
    </div>
    </div>:""}
    
  </div>


   </Link>
  )
}

export default FilterCourseCard