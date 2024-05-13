import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface ExamsCategoryCardProps{
  name: string;
  url: string;
  image: any;
}
const ExamsCategoryCard:React.FC<ExamsCategoryCardProps> = ({name,url,image}) => {
  return ( <Link href={url}  className="z-30 no-underline block w-full md:max-w-sm p-2 md:p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 group">
    
  <div className="flex h-full flex-col md:flex-row items-center text-center  gap-2">
    <div className="">
    <Image height={100} width={100} src={image} alt={name}/>
    </div>
    <div className="h-full w-full p-2 flex justify-center items-center">
    
    <p className=" text-base md:text-lg text-gray-700 font-semibold tracking-tight   dark:text-gray-400 group-hover:dark:text-white ">{name}</p>
    </div>
  </div>
    </Link>
    
  )
}

export default ExamsCategoryCard