import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PiStudentLight } from "react-icons/pi";
import { BsPeople } from "react-icons/bs";
import { SiBookstack } from "react-icons/si";
import ChannelVerfiedComponent from '../ChannelVerfiedComponent';
interface AccountCardProps{
  image:string;
  name:string,
  url:string
  title:string

}
const AccountCard:React.FC<AccountCardProps>= ({url,image,name,title}) => {
  const names=name?.split(" ")
  return (
    <Link href={url} className='bg-white no-underline shadow border dark:border-gray-500 hover:border-green-500 hover:dark:border-yellow-400 hover:bg-slate-50 hover:dark:bg-gray-700 dark:bg-gray-800 max-w-64 overflow-hidden p-2 h-fit w-fit flex justify-center rounded-lg transition duration-300'>
      <div className="flex flex-col  justify-center text-center items-center">
      <Avatar className={`${!image&&'hidden'}  h-16 w-16 `}>
      <AvatarImage src={image||""} alt="image" />
      <AvatarFallback>{names? names[0][0]:''}{names?names[1][0]:''}</AvatarFallback>
    </Avatar>

  <div className="mt-2 ">
  <div className=" w-full flex gap-1 items-center">
  <p className='text-base truncate  text-gray-800 dark:text-gray-100  font-medium p-0'>{name}</p>
  <ChannelVerfiedComponent/>
  </div>
    <p className='text-gray-600 tracking-tight h-4   truncate font-light  font-sans text-sm dark:text-gray-300 text-center'>{title}</p>
  </div>

  <div className="mt-2 w-full py-2">
    <ul className=' w-full text-start items-start text-[12px] font-thin space-y-0 text-gray-600 dark:text-gray-300 list-none'>
    <li className='flex gap-1'>
        <SiBookstack size={16}/>
        <span>15 courses</span>
      </li>

      <li className='flex gap-1'>
        <PiStudentLight size={16}/>
        <span>54 learners</span>
      </li>

      <li className='flex gap-1'>
        <BsPeople size={16}/>
        <span>216 subscribers</span>
      </li>

     
    </ul>
  </div>
    
      </div>

    </Link>
  )
}

export default AccountCard