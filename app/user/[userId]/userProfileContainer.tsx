import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

const UserProfileContainer = ({children,className}:{children:ReactNode,className?:string}) => {
  return (<div className={cn("w-full p-2 py-10 bg-white shadow-slate-200 dark:shadow-black shadow-md rounded-md dark:bg-gray-800",className)}>
    {children}
  </div>
  )
}

export default UserProfileContainer