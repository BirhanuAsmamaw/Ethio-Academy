'use client'

import Link from 'next/link'
import React, {  useState } from 'react'
import { TbLayoutNavbarCollapse } from "react-icons/tb";
import { AiOutlineClose } from 'react-icons/ai'
import { BiLogoTelegram } from 'react-icons/bi'
import { FaGripLinesVertical, FaTelegram } from 'react-icons/fa'
import CreateInstructorLink from '../createInstructorLink'

const SecondNavigation = ({ user }:{user:any}) => {
  const [isSecondNavbar, setIsSecondNavbar] = useState(true);
  

  const onRemoveSecondNavbar=()=>{
    setIsSecondNavbar((prev)=>!prev)
  }
  return (
    <>
      {isSecondNavbar ?(
        <div className="hidden px-6 md:flex h-16 py-1 fixed w-full z-50 bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-600 items-center justify-between">
          <div className="flex gap-2 text-center h-full items-center">
            <span>Contact Us:</span>
            <Link href="https://t.me/Derishemi" className="text-blue-500 hover:text-blue-600 no-underline">
              <FaTelegram size={24} />
            </Link>
            <FaGripLinesVertical className="text-gray-600 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-300">+25193079311</span>
            <FaGripLinesVertical className="text-gray-600 hidden lg:block dark:text-gray-400" />
            <Link href="mailto:deribew.tech@gmail.com" className="hidden lg:block no-underline text-gray-600 dark:text-gray-300">
              deribew.tech@gmail.com
            </Link>
            <FaGripLinesVertical className="text-gray-600 dark:text-gray-400" />
            <Link href="https://t.me/ethio_exams2" className="py-1 px-2 no-underline text-white bg-rose-500 rounded-full hover:bg-rose-600 flex gap-2 justify-center">
              <span>Subscribe</span>
              <BiLogoTelegram />
            </Link>
          </div>
          {!user?.teacher && <CreateInstructorLink />}
          <button 
            onClick={onRemoveSecondNavbar}
            className="text-rose-500 dark:text-rose-400 hover:dark:text-rose-300 hover:text-rose-600"
          >
            <AiOutlineClose size={30} />
          </button>
        </div>
      ):<button onClick={onRemoveSecondNavbar} className='fixed z-40 top-0 right-0 py-1 shadow-md bg-white hover:bg-slate-50 border-2 dark:bg-gray-700 hover:dark:bg-gray-600 px-2 rounded-l-md'>
        <TbLayoutNavbarCollapse size={30}/>
        </button>}
    </>
  );
};

export default SecondNavigation;
