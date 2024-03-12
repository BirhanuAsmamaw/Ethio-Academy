import React, { ReactNode } from 'react'

const Banner = ({children}:{children:ReactNode}) => {
  return (
    <div className="w-full rounded-[10px] text-xl md:2xl lg:4xl font-bold p-2 bg-[url('../public/lightBanner.png')] dark:bg-[url('../public/darkBanner.png')] ">
      {children}
    </div>
  )
}

export default Banner