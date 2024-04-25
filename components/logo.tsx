import React from 'react'
import{Lugrasimo,Oleo_Script} from "next/font/google"
import { Weight } from 'lucide-react'
import Link from 'next/link'
const lugrasimo=Lugrasimo({style:["normal"],subsets:["latin"],weight:["400"]} )
const Oscript=Oleo_Script({style:["normal"],subsets:["latin"],weight:["400"]} )
const Logo = () => {
  return (
    <Link href="/" className='  no-underline hover:bg-gray-100  hover:underline'><div className={`text-xl flex  gap-2 lg:font-extrabold ${Oscript.className}`}>
    <div className="  text-blue-500 dark:text-green-400  lg:hidden rounded-full drop-shadow-2xl text-4xl">EEA</div>
    <div className={`text-blue-500 dark:text-green-400   hidden lg:block leading-10 drop-shadow-2xl ${lugrasimo.className}`}>
        <h1 className='text-xl'>Ethio Exams Academy</h1>
    </div>
</div></Link>
  )
}

export default Logo