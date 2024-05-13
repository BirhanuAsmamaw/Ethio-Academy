import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface AccountCardProps{
  image:string;
  name:string,
  url:string
  title:string

}
const AccountCard:React.FC<AccountCardProps>= ({url,image,name,title}) => {
  return (
    <Link href={url} className='bg-white no-underline shadow border dark:border-gray-500 hover:border-green-500 hover:dark:border-yellow-400 hover:bg-slate-50 hover:dark:bg-gray-700 dark:bg-gray-800 max-w-64 overflow-hidden p-2 h-fit w-fit flex justify-center rounded-lg transition duration-300'>
      <div className="flex flex-col  justify-center text-center items-center">
<Avatar className={`${!image&&'hidden'} h-14 w-14 `}>
      <AvatarImage src={image} alt="image" />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>

  <div className="mt-2">
  <p className='text-base md:text-lg  text-gray-800 dark:text-gray-100  font-medium p-0'>{name}</p>
    <p className='text-gray-600  font-light  font-sans text-sm dark:text-gray-300 text-center'>{title}</p>
  </div>
    
      </div>

    </Link>
  )
}

export default AccountCard