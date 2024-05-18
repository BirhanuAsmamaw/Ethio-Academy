import React from 'react'
import{Lugrasimo,Oleo_Script} from "next/font/google"
import Link from 'next/link'

const lugrasimo=Lugrasimo({style:["normal"],subsets:["latin"],weight:["400"]} )
const Oscript=Oleo_Script({style:["normal"],subsets:["latin"],weight:["400"]} )
const hoverLink='z-50 link decoration-none relative pb-1 hover:dark:text-green-400 hover:text-blue-500 hover:font-medium before:bg-yellow-400  '
const Logo = () => {
  return (
    <Link href="/" className={`pt-1  no-underline ${hoverLink}  hover:bg-opacity-85`}><div className={`text-xl flex  gap-2 lg:font-extrabold ${Oscript.className}`}>
    <div className="    md:hidden rounded-full drop-shadow-2xl text-4xl">
     <span className='text-blue-500 dark:text-green-400'>E</span>
     <span className='text-rose-500 dark:text-yellow-400'>A</span>
      </div>
    <div className={`  hidden md:block leading-10 drop-shadow-2xl ${lugrasimo.className}`}>
        <h1 className='text-xl p-0'>
          <span className='text-blue-500 dark:text-green-400 '>Ethio</span>
         <span className='text-rose-500 dark:text-yellow-400 '>Academy</span></h1>
    </div>
</div></Link>
  )
}

export default Logo