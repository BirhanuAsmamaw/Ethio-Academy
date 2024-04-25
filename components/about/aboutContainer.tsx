import React from 'react'

interface AboutContainerProps{
    className:string,
    title:string,
    children:React.ReactNode
}
const AboutContainer:React.FC<AboutContainerProps> = ({children,className,title}) => {
  return (<div className={` text-gray-900 space-y-4 shadow-md p-4 rounded-[10px] ${className}`}>
  <h1 className='text-2xl font-semibold leading-6'>{title}</h1>
  {children}
</div>
  )
}

export default AboutContainer