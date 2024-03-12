import React, { ReactNode } from 'react'

const Banner = ({children}:{children:ReactNode}) => {
  return (
    <div className='w-full rounded-[10px] p-2 light-banner  dark:dark-banner '>
      {children}
    </div>
  )
}

export default Banner