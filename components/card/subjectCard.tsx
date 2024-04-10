import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface SubjectCardProps{
  name: string;
  url: string;
  image: any;
}
const SubjectCard:React.FC<SubjectCardProps> = ({name,url,image}) => {
  return ( <Link href={url}  className="z-30 no-underline block w-full md:max-w-sm  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 group">
    
  <div className="flex justify-around gap-2">
    <div className="">
    <Image 
    height={120} 
    width={100} 
    src={image} 
    alt={name}/>
    </div>
    <div className="">
    
    <p className=" w-full text-base text-gray-700 font-semibold  dark:text-gray-400 group-hover:dark:text-white ">{name}</p>
    </div>
  </div>
    </Link>
    
  )
}

export default SubjectCard