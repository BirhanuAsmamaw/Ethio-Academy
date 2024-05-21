"use client"
import React from 'react'
import InstructorProfile from "../../../../public/instructor.png";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface InstructorHeroProps{
  onClick:()=>void;
}
const InstructorHero:React.FC<InstructorHeroProps>= ({onClick}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-fit items-center w-full'>
      
      <div className="text-[14px] sm:text-[20px]  mt-4  py-4 text-left">
        <span>Join our vibrant community of passionate instructors and make a real difference by sharing your expertise. At </span>
        <Link href="/" className="text-lg no-underline hover:underline p-0">
          <span className="text-blue-500 dark:text-green-400">Ethio</span>
          <span className="text-rose-500 dark:text-yellow-400">Academy</span>
        </Link>
        <span>, we empower you with the tools and support to create transformative and impactful courses for learners across the globe.</span>

        <div className="flex w-full justify-center py-10">
          <Button
          onClick={onClick}
            className="transition rounded-full duration-300 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 ">Create Account</Button>
        </div>
      </div>
     
      <div className="">
        <Image width={400}  height={500} src={InstructorProfile} alt='instructor profile'/>
      </div>
    </div>
  )
}

export default InstructorHero